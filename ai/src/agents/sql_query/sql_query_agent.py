from .assistant_openai_sql_query import get_chat_tools
from src.utils.load_yaml_prompts import load_prompts
from src.agents.sql_query.tools_dict import query_tools_list , query_tools_dict
from src.utils import DATABASE_SCHEMA_TEXT
from src.agents.sql_query.charts_builder.charts_agent import charts_agent
from src.agents.sql_query.output_analysis.analysis_model import analysis_agent
import json
import random
import threading

system_content = load_prompts(r'src/agents/sql_query/prompts.yaml')["query_agent"]["system_content"].replace("{db_schema}", DATABASE_SCHEMA_TEXT)

# print(system_content)


class ChartsThread(threading.Thread):
    def __init__(self, history):
        super().__init__()
        self.history = history
        self.result = None
        self.error = None

    def run(self):
        try:
            self.result = charts_agent(self.history)
        except Exception as e:
            self.error = str(e)

model = "gpt-4.1"
def analysis_visualization_agent(query):
    state = random.choice([
    "sharing insights",
    "giving analysis",
    "providing insights",
    "explaining findings",
    "offering analysis",
    "delivering insights",
    "presenting results",
    "highlighting patterns",
    "revealing insights",
    "summarizing analysis"
    ])
    # print(query)
    messages = [
        {"role": "system", "content": system_content},
        {"role": "user", "content": query},
    ]
    final_text = ''
    for text in get_chat_tools(model, messages,query_tools_list ,query_tools_dict ):
        # print(text['data'] , end = '')
        if text['state'] == "messages":
            history = text['data']
        else:
            final_text += text['data']


    # Your modified code
    parsed_mode = json.loads(final_text)['mode']
    charts_thread = None

    # Start charts thread if needed
    if "charts" in parsed_mode:
        charts_thread = ChartsThread(history)
        charts_thread.start()

    # Stream analysis if needed
    if "analysis" in parsed_mode:
        for chunk in analysis_agent(history):
            yield {"state": state, "data": chunk, "data_type": "text", "responding_model": "analysis", "status": "ok"}

    # Wait for charts thread to complete and yield result
    if charts_thread is not None:
        charts_thread.join()  # Block until thread completes

        if charts_thread.error:
            yield {"state": "charts", "data": {"error": charts_thread.error}, "data_type": "charts",
                   "responding_model": "visualization", "status": "error"}
        else:
            yield {"state": "charts", "data": json.loads(charts_thread.result), "data_type": "charts",
                   "responding_model": "visualization", "status": "ok"}
    # # print("final_text", final_text)
    # if "analysis" in json.loads(final_text)['mode']:
    #     for chunk in analysis_agent(history):
    #        yield {"state": state, "data": chunk , "data_type": "text", "responding_model": "analysis", "status": "ok" }
    # if "charts" in json.loads(final_text)['mode']:
    #     charts =  charts_agent(history)    # Background_excute.
    #     yield {"state": "charts", "data": json.loads(charts) , "data_type": "charts" , "responding_model": "visualization", "status": "ok"}




    # return final_text