
from fastapi import APIRouter

from app.api.api_v1.routes import auth, cast_iron, calculators, round_pipe

api_router = APIRouter()
api_router.include_router(calculators.router, prefix="/calculators", tags=["calculators"])
api_router.include_router(cast_iron.router, prefix="/cast_iron", tags=["cast_iron"])
api_router.include_router(round_pipe.router, prefix="/round_pipe", tags=["round_pipe"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])