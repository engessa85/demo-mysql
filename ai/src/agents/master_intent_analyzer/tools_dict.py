from src.agents.sql_query.sql_query_agent import analysis_visualization_agent


starting_tools_dict = {
    "analysis_visualization_agent": analysis_visualization_agent,
}


starting_tools_list = [
  {
    "type": "function",
    "function": {
      "name": "analysis_visualization_agent",
      "description": "Executes operations to provide data analysis, visualization, or both, based on user intent.",
      "parameters": {
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "A summary of what the user is exaclty asking for."
          }
        },
        "required": ["query"]
      }
    }
  },
# {
#   "type": "function",
#   "function": {
#     "name": "get_database_schema_text",
#     "description": "Returns the full database schema and representative sample data for each table. Useful for understanding table structure and relationships. This should be a question a user like one",
#     "parameters": {
#       "type": "object",
#       "properties": {},
#       "required": []
#     }
#   }
# }
]