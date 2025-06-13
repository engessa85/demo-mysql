from src.agents.sql_query.charts_builder.tools import *
chart_schema_tools_dict = chart_schema_tool_map = {
    "get_line_chart_schema": get_line_chart_schema,
    "get_pie_chart_schema": get_pie_chart_schema,
    "get_bar_chart_schema": get_bar_chart_schema,
    "get_scatter_chart_schema": get_scatter_chart_schema,
}



chart_schema_tools_list = [
    {
        "type": "function",
        "function": {
            "name": "get_line_chart_schema",
            "description": "Generate a JSON string embedding a JavaScript Chart.js configuration for a line chart. Includes dataset, labels, colors, and basic options.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_pie_chart_schema",
            "description": "Generate a JSON string embedding a JavaScript Chart.js configuration for a pie chart. Includes category labels, colors, and legend options.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_bar_chart_schema",
            "description": "Generate a JSON string embedding a JavaScript Chart.js configuration for a bar chart. Includes axes titles, datasets, and legend/title options.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_scatter_chart_schema",
            "description": "Generate a JSON string embedding a JavaScript Chart.js configuration for a scatter chart. Supports coordinate points, axis bounds, titles, and appearance settings.",
            "parameters": {
                "type": "object",
                "properties": {},
                "required": []
            }
        }
    }
]
