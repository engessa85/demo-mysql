from src.agents.master_intent_analyzer.assistant_openai_master import get_chat_tools
from src.utils.load_yaml_prompts import load_prompts
from src.agents.master_intent_analyzer.tools_dict import starting_tools_list , starting_tools_dict
from src.utils import DATABASE_SCHEMA_TEXT
from src.utils.logs import logger
import random


model = "gpt-4.1-mini"
system_content = load_prompts(r'src/agents/master_intent_analyzer/prompts.yaml')["master_agent"]["intent_agent"] + "**DB schema: ** \n" + DATABASE_SCHEMA_TEXT
# print(system_content)

def master_agent(messages_list):
    messages = [
        {"role": "system", "content": system_content},
    ] + messages_list

    state = random.choice([
            "thinking",
            "processing",
            "loading",
            "working",
            "wait a moment",
            "just a second",
            "one moment",
            "getting info",
            "checking",
            "almost done"
        ])
    yield {"state": state, "data": '', "data_type": "text","responding_model": "master" , "status": "ok"}  # your output method

    try:
        for text in get_chat_tools(model, messages,starting_tools_list ,starting_tools_dict ):
            yield text

        logger.info(f"Finished responding to : {messages_list[-1].get('content', '')}...")

    except Exception as e:
        yield {"state": state, "data": '', "data_type": "error", "responding_model": "master", "status": "error" , "reason":e}  # your output method



# from src.agents.sql_query.sql_query_agent import analysis_visualization_agent
# from src.agents.agents_functions import  master_agent
# import json
#
#
# # final_text = ''
# # for x in charts_agent():
# #     final_text += x['data']
# #     # print(x['data'] , end='')
# #
# # print("_________________________________")
# # print(json.loads(final_text)["schema"] + ";")
# # final_text = ''
# # for x in sql_agent("Who has the most tracks?"):
# #     final_text += x['data']
# #     print(x['data'] , end='')
#
# # print(analysis_visualization_agent("Create a chart bar and line who has the most tracks?"))
#
# # final_text = ''
# # for text in analysis_visualization_agent("Create a chart bar chart, pie  and line  charts who has the most tracks?"):
# #     # print(text, end='')
# #     final_text+= text
# # # print("_________________________________")
# # # print(final_text)
# # print("_________________________________")
# # print(json.loads(final_text))
#
#
# # print(analysis_visualization_agent("Create a bar chart showing the number of albums for each artist. Display artist names on the x-axis and the album count on the y-axis. Sort the chart by album count in descending order to highlight who has the most albums."))
# # query =  "hello"
# # messages = [
# #     {"role": "user",
# #      "content": query},
# # ]
# # for word in master_agent(messages):
# #
# #     print(word , end= '')
#
#
# # Initialize the conversation history
# messages = []
#
# while True:
#     # Prompt the user for input
#     user_input = input("You: ")
#
#     # Exit condition
#     if user_input.lower() in ["exit", "quit"]:
#         print("Assistant: Goodbye!")
#         break
#
#     # Append the user's message to the conversation history
#     messages.append({"role": "user", "content": user_input})
#
#     # Generate the assistant's response using the master_agent function
#     response = ""
#     for word in master_agent(messages):
#         print(word["data"], end='', flush=True)
#         response += str(word["data"])
#     print()  # For newline after the assistant's response
#
#     # Append the assistant's response to the conversation history
#     messages.append({"role": "assistant", "content": response})
# { "messages" :[
#
#         {
#             "role": "user",
#             "content": "Hello"
#         },
#         {
#             "role": "assistant",
#             "content": "Hi !, How can I help you?"
#         }
#  ] ,
#
# "session_id" : id_session,   # For getting handling the history if needed in the future
# "user_id"  :   user_id       # to have customization for each user( DBs, prompt etc ) .
# }
# def ai_bi_chat(messages : dict):
