
from langchain_community.utilities import SQLDatabase
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate




import os
from dotenv import load_dotenv
from pathlib import Path

# Create your views here.


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")



def conneting_with_db(db_user, db_password, db_host, db_name):
    db = SQLDatabase.from_uri(
        f"mysql+pymysql://{db_user}:{db_password}@{db_host}/{db_name}", sample_rows_in_table_info=0)
    return db


def calling_open_ai_model(model_name):
    model = ChatOpenAI(
        model=model_name, openai_api_key=os.getenv("OPEN_AI_KEY"))
    return model


def prompting():
    sql_prompt = PromptTemplate(
        input_variables=["question", "table_info"],
        template="""You are an expert SQL query generator. Given a database schema and a user question, generate ONLY the SQL query.

            Database Schema:
            {table_info}

            Instructions:
            - Return ONLY the SQL query with NO explanations.
            - Do NOT add markdown (```sql ... ```).
            - Do NOT include any text before or after the SQL query.
            - Do NOT accept any update, delete or create in databse reply with not acceptable.

            User Question: {question}

            SQL Query:
            """
    )

    return sql_prompt