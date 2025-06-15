import time
import pymysql
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from src.api import router as api_router
import os

DB_HOST = os.getenv("DB_HOST")
DB_PORT = int(os.getenv("DB_PORT", 3306))
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

# Wait for MySQL before app starts
def wait_for_db(max_retries=10, delay=5):
    for i in range(max_retries):
        try:
            print(f"⏳ Waiting for the database to be ready (Attempt {i+1})...")
            conn = pymysql.connect(
                host=DB_HOST,
                port=DB_PORT,
                user=DB_USER,
                password=DB_PASSWORD,
                database=DB_NAME,
                connect_timeout=5
            )
            conn.close()
            print("✅ Database is ready.")
            return
        except pymysql.MySQLError as e:
            print(f"❌ DB not ready: {e}")
            time.sleep(delay)
    raise RuntimeError("❌ Could not connect to the database after several attempts.")

# Call wait before creating app
wait_for_db()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/bi_v1")

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")
