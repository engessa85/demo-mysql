import json


def run_tool(tools_dict,tool_name, input_data):
    # print(input_data)
    input_data = json.loads(input_data)
    return tools_dict[tool_name](**input_data)


