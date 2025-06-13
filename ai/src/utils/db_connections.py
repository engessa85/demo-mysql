import os
from typing import List, Tuple, Optional
import pymysql
from pymysql.connections import Connection
from dotenv import load_dotenv

def load_env_variables() -> dict:
    """Load database credentials from .env file."""
    load_dotenv()
    return {
        "host": os.getenv("DB_HOST"),
        "port": int(os.getenv("DB_PORT", 3306)),
        "user": os.getenv("DB_USER"),
        "password": os.getenv("DB_PASSWORD"),
        "database": os.getenv("DB_NAME")
    }

def connect_to_mysql(config = load_env_variables()) -> Optional[Connection]:
    """Establish a connection to the MySQL database."""
    try:
        conn = pymysql.connect(
            host=config["host"],
            port=config["port"],
            user=config["user"],
            password=config["password"],
            database=config["database"]
        )
        return conn
    except pymysql.MySQLError as e:
        print(f"Connection failed: {e}")
        return None