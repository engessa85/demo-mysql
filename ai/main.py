from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv(usecwd=True))
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from src.api import router as api_router



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


