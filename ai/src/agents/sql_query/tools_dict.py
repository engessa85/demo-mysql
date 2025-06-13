from src.agents.sql_query.tools import *


query_tools_dict = {
    "execute_query": execute_query
}


query_tools_list = [
  {
  "type": "function",
  "function": {
    "name": "execute_query",
    "description": "Execute a raw SQL query on a connected MySQL database and return the result as a JSON-compatible list of rows.",
    "parameters": {
      "type": "object",
      "properties": {
        "sql_query": {
          "type": "string",
          "description": "The raw SQL query string to be executed."
        }
      },
      "required": ["sql_query"]
    }
  }
}
]