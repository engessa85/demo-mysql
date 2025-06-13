from collections import defaultdict
from dotenv import load_dotenv
from openai import OpenAI
from src.tools.run_tools import run_tool
from src.utils.logs import logger# Load environment variables from .env file


load_dotenv()


client = OpenAI()


def tool_list_to_tool_obj(tools):
    # Initialize a dictionary with default values
    tool_calls_dict = defaultdict(lambda: {"id": None, "function": {"arguments": "", "name": None}, "type": None})

    # Iterate over the tool calls
    for tool_call in tools:
        # If the id is not None, set it
        if tool_call.id is not None:
            tool_calls_dict[tool_call.index]["id"] = tool_call.id

        # If the function name is not None, set it
        if tool_call.function.name is not None:
            tool_calls_dict[tool_call.index]["function"]["name"] = tool_call.function.name

        # Append the arguments
        tool_calls_dict[tool_call.index]["function"]["arguments"] += tool_call.function.arguments

        # If the type is not None, set it
        if tool_call.type is not None:
            tool_calls_dict[tool_call.index]["type"] = tool_call.type

    # Convert the dictionary to a list
    tool_calls_list = list(tool_calls_dict.values())

    # Return the result
    return {"tool_calls": tool_calls_list}


def get_chat_tools(model,messages_list,tools_list, tools_dict):
    while True:
        response = client.chat.completions.create(
                        model=model,
                        messages=messages_list,
                        tools=tools_list,
                        tool_choice='auto',
                        stream = True,
                        temperature= 0.5,
                        response_format={"type": "json_object"}
                    )
        reply =  " "
        tools = []
        for chunk in response:
            # print(chunk.choices[0].delta)
            if chunk.choices[0].delta.content:
                yield {"state": "streaming_response", "data": chunk.choices[0].delta.content}  # your output method
            if chunk.choices[0].delta.tool_calls:
                tools += chunk.choices[0].delta.tool_calls  # gather ChoiceDeltaToolCall list chunks

        tools_obj = tool_list_to_tool_obj(tools)
        # print("tools to call" , tools_obj)
        if tools_obj["tool_calls"]:
                messages_list.append({"role": "assistant", "content": None, "tool_calls": tools_obj["tool_calls"]})
                try:
                    for tool_call in tools_obj["tool_calls"]:
                        # print(tool_call)
                        results = run_tool(tools_dict,tool_call['function']['name'],tool_call['function']['arguments'])
                        # print(results)
                        messages_list.append({
                            'role': 'tool',
                            'tool_call_id': tool_call['id'],
                            'name': tool_call['function']['name'],
                            'content': str(results)  # Convert results to string
                        })
                        logger.info(f"Tool_call: {tool_call['function']['name']}, Response: {str(results)[:100]}")
                except:
                    logger.error(f"Calling: {tool_call['function']['name']} Fail")
                    messages_list.append({
                        'role': 'tool',
                        'tool_call_id': tool_call['id'],
                        'name': tool_call['function']['name'],
                        'content': "Could not get the results for this tool"  # Convert results to string
                    })

        else:
            yield {"state": "messages", "data": str(messages_list[1:])}  # your output method
            break
        # print(reply)
        # print(tools_obj)


