import os
import time
from fastapi import FastAPI, APIRouter, Request
from app.core.config import settings
from app.api.api_v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware

from fastapi.templating import Jinja2Templates
from pathlib import Path

BASE_PATH = Path(__file__).resolve().parent
TEMPLATES = Jinja2Templates(directory=str(BASE_PATH / "templates"))

os.environ["TZ"] = settings.TIMEZONE
time.tzset()

def get_application() -> FastAPI:
    application = FastAPI(
        title=settings.TITLE,
        description=settings.DESCRIPTION,
        debug=settings.DEBUG,
        redoc_url=None,
        openapi_url=f"/api/v1/openapi.json",
    )

    root_router = APIRouter()

    origins = [
    "http://localhost:3000",
    "https://localhost:3000",
    "http://localhost",
    "https://localhost"
]

    application.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

    @root_router.get("/", status_code=200)
    async def root(
        request: Request
    ) -> dict:
        """
        Root GET
        """
        return TEMPLATES.TemplateResponse("index.html", {"request": request}
    )

    application.include_router(api_router, prefix=settings.API_V1_STR)
    application.include_router(root_router)

    return application

app = get_application()
    