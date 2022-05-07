from typing import Any, Optional
import math
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

from app import crud

router = APIRouter()

@router.get("/skew_hole_OD/", status_code=200)
async def fetch_item(*, pipe_OD: float, angle_in: int, wall_thickness: float) -> Any:
    """
    Fetch a skewed pipe true OD
    """
    angle_to_rad = math.radians(angle_in)
    final_OD = (pipe_OD / math.cos(angle_to_rad)) + (wall_thickness * math.tan(angle_to_rad))
    return round(final_OD, 2)
