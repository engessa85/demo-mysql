from src.agents.sql_query.charts_builder.assistant_openai_charts import get_chat_tools
from src.utils.load_yaml_prompts import load_prompts
from src.agents.sql_query.charts_builder.tools_dict import chart_schema_tools_list , chart_schema_tools_dict



system_content = load_prompts(r'src/agents/sql_query/charts_builder/prompts.yaml')["charts_agent"]["system_content"]

# print(system_content)



# model = "gpt-4.1-mini"
model = "gpt-4.1-mini"

def charts_agent(history):
    messages = [
        {"role": "system", "content": system_content},
        {"role": "user",
         "content": "Create a chart for: "  + history},
    ]
    final_text = ''
    for text in get_chat_tools(model, messages,chart_schema_tools_list ,chart_schema_tools_dict ):
        final_text += text['data']
        # yield(text)
    return final_text