import time
import pymysql
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from src.api import router as api_router
import os

# DB_HOST = os.getenv("DB_HOST")
# DB_PORT = int(os.getenv("DB_PORT", 3306))
# DB_USER = os.getenv("DB_USER")
# DB_PASSWORD = os.getenv("DB_PASSWORD")
# DB_NAME = os.getenv("DB_NAME")



# def wait_for_db():
#     for _ in range(10):
#         try:
#             conn = pymysql.connect(
#                 host=os.getenv("DB_HOST"),
#                 user=os.getenv("DB_USER"),
#                 password=os.getenv("DB_PASSWORD"),
#                 database=os.getenv("DB_NAME"),
#                 port=int(os.getenv("DB_PORT")),
#                 connect_timeout=5
#             )
#             conn.close()
#             print("✅ DB ready!")
#             return
#         except Exception as e:
#             print(f"⏳ Waiting for DB: {e}")
#             time.sleep(5)
#     raise Exception("❌ DB not ready after retries")

# wait_for_db()


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
