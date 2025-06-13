from .schema_extractor import get_database_schema_text
from .db_connections import connect_to_mysql

__all__ = ['get_database_schema_text', 'DATABASE_SCHEMA_TEXT']

# Create shared instances on package import
DATABASE_SCHEMA_TEXT = get_database_schema_text()
