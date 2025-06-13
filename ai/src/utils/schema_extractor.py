from typing import List, Tuple
from .db_connections import load_env_variables, connect_to_mysql




def get_tables(cursor) -> List[str]:
    """Retrieve the list of tables in the database."""
    cursor.execute("SHOW TABLES;")
    return [row[0] for row in cursor.fetchall()]

def describe_table(cursor, table_name: str) -> List[Tuple]:
    """Retrieve the schema for a specific table."""
    cursor.execute(f"DESCRIBE `{table_name}`;")
    return cursor.fetchall()

def get_database_schema_text() -> str:
    """
    Connects to the database and returns a text-based schema
    for all tables using SHOW TABLES and DESCRIBE.
    """
    config = load_env_variables()
    conn = connect_to_mysql(config)
    if not conn:
        return "Failed to connect to the database."

    schema_lines = []
    try:
        with conn.cursor() as cursor:
            tables = get_tables(cursor)
            if not tables:
                return "⚠️ No tables found in the database."

            for table in tables:
                schema_lines.append(f"\nTable: {table}")
                schema_lines.append("-" * 80)
                schema_lines.append(f"{'Field':<20} {'Type':<20} {'Null':<6} {'Key':<6} {'Default':<12} {'Extra'}")
                schema_lines.append("-" * 80)

                for field, type_, null, key, default, extra in describe_table(cursor, table):
                    line = f"{field:<20} {type_:<20} {null:<6} {key:<6} {str(default):<12} {extra}"
                    schema_lines.append(line)


    finally:
        conn.close()

    return "\n".join(schema_lines)
# def get_columns(cursor, schema: str, table: str) -> List[Tuple]:
#     """
#     Returns detailed column info for `schema.table`, including:
#       - COLUMN_NAME, DATA_TYPE, COLUMN_TYPE
#       - IS_NULLABLE, COLUMN_DEFAULT
#       - CHARACTER_SET_NAME, COLLATION_NAME
#       - COLUMN_COMMENT
#     """
#     sql = """
#     SELECT
#       COLUMN_NAME, DATA_TYPE, COLUMN_TYPE, IS_NULLABLE,
#       COLUMN_DEFAULT, CHARACTER_SET_NAME, COLLATION_NAME, COLUMN_COMMENT
#     FROM INFORMATION_SCHEMA.COLUMNS
#     WHERE TABLE_SCHEMA = %s
#       AND TABLE_NAME   = %s
#     ORDER BY ORDINAL_POSITION;
#     """
#     cursor.execute(sql, (schema, table))
#     return cursor.fetchall()
#
#
# def get_indexes(cursor, schema: str, table: str) -> List[Tuple]:
#     """
#     Returns index details for `schema.table`, including:
#       - INDEX_NAME, NON_UNIQUE, SEQ_IN_INDEX
#       - COLUMN_NAME, CARDINALITY, INDEX_TYPE
#     """
#     sql = """
#     SELECT
#       INDEX_NAME, NON_UNIQUE, SEQ_IN_INDEX,
#       COLUMN_NAME, CARDINALITY, INDEX_TYPE
#     FROM INFORMATION_SCHEMA.STATISTICS
#     WHERE TABLE_SCHEMA = %s
#       AND TABLE_NAME   = %s
#     ORDER BY INDEX_NAME, SEQ_IN_INDEX;
#     """
#     cursor.execute(sql, (schema, table))
#     return cursor.fetchall()
#
# def get_foreign_keys(cursor, schema: str, table: str) -> List[Tuple]:
#     """
#     Returns FK constraints for `schema.table`, including:
#       - CONSTRAINT_NAME, COLUMN_NAME
#       - REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
#       - UPDATE_RULE, DELETE_RULE
#     """
#     sql = """
#     SELECT
#       kcu.CONSTRAINT_NAME,
#       kcu.COLUMN_NAME,
#       kcu.REFERENCED_TABLE_NAME,
#       kcu.REFERENCED_COLUMN_NAME,
#       rc.UPDATE_RULE,
#       rc.DELETE_RULE
#     FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE AS kcu
#     JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS AS rc
#       ON kcu.CONSTRAINT_NAME = rc.CONSTRAINT_NAME
#      AND kcu.CONSTRAINT_SCHEMA = rc.CONSTRAINT_SCHEMA
#     WHERE kcu.TABLE_SCHEMA = %s
#       AND kcu.TABLE_NAME   = %s
#       AND kcu.REFERENCED_TABLE_NAME IS NOT NULL;
#     """
#     cursor.execute(sql, (schema, table))
#     return cursor.fetchall()
#
#
# def get_table_info(cursor, schema: str, table: str) -> Tuple:
#     """
#     Returns overall table info for `schema.table`, including:
#       - TABLE_TYPE, ENGINE, TABLE_ROWS
#       - DATA_LENGTH, INDEX_LENGTH
#       - CREATE_TIME, UPDATE_TIME
#       - TABLE_COLLATION, TABLE_COMMENT
#     """
#     sql = """
#     SELECT
#       TABLE_TYPE, ENGINE, TABLE_ROWS,
#       DATA_LENGTH, INDEX_LENGTH,
#       CREATE_TIME, UPDATE_TIME,
#       TABLE_COLLATION, TABLE_COMMENT
#     FROM INFORMATION_SCHEMA.TABLES
#     WHERE TABLE_SCHEMA = %s
#       AND TABLE_NAME   = %s;
#     """
#     cursor.execute(sql, (schema, table))
#     return cursor.fetchone()
#
# def get_views(cursor, schema: str) -> List[Tuple]:
#     """Returns all views in the schema: VIEW_NAME, VIEW_DEFINITION, IS_UPDATABLE."""
#     sql = """
#     SELECT TABLE_NAME, VIEW_DEFINITION, IS_UPDATABLE
#     FROM INFORMATION_SCHEMA.VIEWS
#     WHERE TABLE_SCHEMA = %s;
#     """
#     cursor.execute(sql, (schema,))
#     return cursor.fetchall()
#
# def get_triggers(cursor, schema: str) -> List[Tuple]:
#     """Returns all triggers in the schema: TRIGGER_NAME, EVENT_MANIPULATION, ACTION_TIMING, ACTION_STATEMENT."""
#     sql = """
#     SELECT TRIGGER_NAME, EVENT_MANIPULATION, ACTION_TIMING, ACTION_STATEMENT
#     FROM INFORMATION_SCHEMA.TRIGGERS
#     WHERE TRIGGER_SCHEMA = %s;
#     """
#     cursor.execute(sql, (schema,))
#     return cursor.fetchall()
#
# def get_routines(cursor, schema: str) -> List[Tuple]:
#     """Returns all stored procedures/functions: ROUTINE_NAME, ROUTINE_TYPE, CREATED, LAST_ALTERED."""
#     sql = """
#     SELECT ROUTINE_NAME, ROUTINE_TYPE, CREATED, LAST_ALTERED
#     FROM INFORMATION_SCHEMA.ROUTINES
#     WHERE ROUTINE_SCHEMA = %s;
#     """
#     cursor.execute(sql, (schema,))
#     return cursor.fetchall()
#
#
# def get_database_schema_text() -> str:
#     config = load_env_variables()
#     conn   = connect_to_mysql(config)
#     if not conn:
#         return "Failed to connect to the database."
#
#     schema = config.get("database")
#     lines  = []
#
#     try:
#         with conn.cursor() as cur:
#             # Tables
#             tables = get_tables(cur)
#             if not tables:
#                 return "⚠️ No tables found in the database."
#
#             for tbl in tables:
#                 lines.append(f"\nTABLE: {tbl}")
#                 lines.append("=" * 80)
#
#                 # 1. Table‑level info
#                 info = get_table_info(cur, schema, tbl)
#                 lines.append(f"Type: {info[0]}, Engine: {info[1]}, Rows: {info[2]}")
#                 size_mb = (info[3] + info[4]) / 1024**2
#                 lines.append(f"Size: {size_mb:.2f} MB, Collation: {info[7]}")
#                 if info[8]:
#                     lines.append(f"Comment: {info[8]}")
#                 lines.append("")
#
#                 # 2. Columns
#                 cols = get_columns(cur, schema, tbl)
#                 lines.append(f"{'Col':<20} {'Type':<20} {'Null':<6} {'Default':<12} Charset/Collation")
#                 lines.append("-" * 80)
#                 for col in cols:
#                     lines.append(
#                         f"{col[0]:<20} {col[2]:<20} {col[3]:<6} "
#                         f"{str(col[4]):<12} {col[5]}/{col[6]}"
#                     )
#                     if col[7]:
#                         lines[-1] += f"  -- {col[7]}"
#                 lines.append("")
#
#                 # 3. Indexes
#                 idxs = get_indexes(cur, schema, tbl)
#                 if idxs:
#                     lines.append("Indexes:")
#                     current = None
#                     for name, non_u, seq, col, card, idx_type in idxs:
#                         if name != current:
#                             lines.append(f"  {name} ({'UNIQUE' if non_u==0 else 'NON-UNIQUE'}):")
#                             current = name
#                         lines.append(f"    {seq}. {col}  [{idx_type}, cardinality={card}]")
#                     lines.append("")
#
#                 # 4. Foreign Keys
#                 fks = get_foreign_keys(cur, schema, tbl)
#                 if fks:
#                     lines.append("Foreign Keys:")
#                     for cname, col, ref_tbl, ref_col, up, dl in fks:
#                         lines.append(
#                             f"  {cname}: {col} → {ref_tbl}({ref_col}) "
#                             f"[ON UPDATE {up}, ON DELETE {dl}]"
#                         )
#                     lines.append("")
#
#             # 5. Views, Triggers, Routines (schema‑wide)
#             views    = get_views(cur, schema)
#             triggers = get_triggers(cur, schema)
#             routines = get_routines(cur, schema)
#
#             if views:
#                 lines.append("\nVIEWS:")
#                 for name, definition, updatable in views:
#                     lines.append(f"  {name} (updatable={updatable})")
#                 lines.append("")
#
#             if triggers:
#                 lines.append("\nTRIGGERS:")
#                 for name, event, timing, stmt in triggers:
#                     lines.append(f"  {name}: {timing} {event} → {stmt}")
#                 lines.append("")
#
#             if routines:
#                 lines.append("\nROUTINES:")
#                 for name, rtype, created, altered in routines:
#                     lines.append(f"  {rtype} {name}, created {created}, altered {altered}")
#                 lines.append("")
#
#     finally:
#         conn.close()
#
#     return "\n".join(lines)
#
#
# # print(get_database_schema_text())