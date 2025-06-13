from .assistant_openai import get_chat_tools
from src.utils.load_yaml_prompts import load_prompts
from src.agents.sql_query.charts_builder.tools_dict import chart_schema_tools_list , chart_schema_tools_dict



system_content = load_prompts(r'src/agents/sql_query/output_analysis/prompts.yaml')["system_content"]

# print(system_content)



model = "gpt-4.1-mini"

def analysis_agent(history):
    messages = [
        {"role": "system", "content": system_content},
        {"role": "user",
         "content": history},
    ]
    final_text = ''
    for text in get_chat_tools(model, messages,[] ,[] ):
        final_text += text['data']
        yield text['data']


# for i in analysis_agent("""{'schemas': [{'type': 'bar', 'data': {'labels': ['Iron Maiden', 'Led Zeppelin', 'Deep Purple', 'Metallica', 'U2', 'Ozzy Osbourne', 'Pearl Jam', 'Various Artists', 'Faith No More', 'Foo Fighters', 'Van Halen', 'Lost', 'Berliner Philharmoniker & Herbert Von Karajan', 'Gilberto Gil', 'Miles Davis', "Guns N' Roses", 'Jamiroquai', 'Os Paralamas Do Sucesso', 'Red Hot Chili Peppers', 'The Rolling Stones', 'Eugene Ormandy', 'Audioslave', 'Queen', 'Santana', 'R.E.M.', 'The Office', 'AC/DC', 'Amy Winehouse', 'Black Label Society', 'Cidade Negra', 'Milton Nascimento', 'Kiss', 'Green Day', 'Creedence Clearwater Revival', 'Djavan', 'Skank', 'Titãs', 'English Concert & Trevor Pinnock', 'Accept', 'Michael Tilson Thomas & San Francisco Symphony', 'Antônio Carlos Jobim', 'Black Sabbath', 'Caetano Veloso', 'Chico Science & Nação Zumbi', 'Spyro Gyra', 'Cássia Eller', 'Eric Clapton', 'Legião Urbana', 'Lulu Santos', 'Nirvana', 'Smashing Pumpkins', 'The Black Crowes', 'The Cult', 'The Tea Party', 'Tim Maia', 'Battlestar Galactica'], 'datasets': [{'label': 'Number of Albums', 'data': [21, 14, 11, 10, 10, 6, 5, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], 'backgroundColor': 'rgba(54, 162, 235, 0.7)', 'borderColor': 'rgba(54, 162, 235, 1)', 'borderWidth': 1}]}, 'options': {'responsive': True, 'maintainAspectRatio': False, 'plugins': {'title': {'display': True, 'text': 'Number of Albums per Artist'}, 'legend': {'display': True, 'position': 'top'}}, 'scales': {'y': {'beginAtZero': True, 'title': {'display': True, 'text': 'Album Count'}}, 'x': {'title': {'display': True, 'text': 'Artist'}}}}}]}"""):
#     print(i, end = '')
