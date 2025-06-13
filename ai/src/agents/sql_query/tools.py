import pymysql
from pymysql.cursors import DictCursor
from typing import Optional, List, Dict, Any
from src.utils.db_connections import connect_to_mysql  # Ensure DB_CONN is properly initialized elsewhere

def execute_query(sql_query: str) -> Optional[List[Dict[str, Any]]]:
    """
    Executes a SQL query using the DB_CONN helper and returns the results.

    Parameters:
    - sql_query (str): The SQL query to execute.

    Returns:
    - A list of dictionaries (rows) if successful, or None on failure.
    """
    conn = connect_to_mysql()
    if conn is None:
        print("❌ Database connection is not established.")
        return None

    try:
        with conn.cursor(DictCursor) as cursor:
            cursor.execute(sql_query)
            results = cursor.fetchall()
            return results if results else []
    except pymysql.MySQLError as e:
        print(f"❌ Query failed: {e} , {sql_query}")
        return None
    finally:
        conn.close()
