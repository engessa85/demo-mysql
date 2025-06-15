from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv(usecwd=True))
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from src.api import router as api_router
import asyncio



app = FastAPI()


# Optional: Sleep before doing anything else
@app.on_event("startup")
async def wait_for_db():
    print("⏳ Waiting for the database to be ready...")
    await asyncio.sleep(10)  # Waits for 10 seconds
    print("✅ Proceeding with FastAPI startup")
    
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


