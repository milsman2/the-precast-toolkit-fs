from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

from app import crud
from app.api import deps
from app.schemas.cast_iron import (
    CastIron,
    CastIronCreate,
    CastIronSearchResults,
    CastIronUpdateRestricted
)
from app.models.user import User

router = APIRouter()

@router.get("/all-cast-iron/", status_code=200, response_model=CastIronSearchResults)
async def get_user_items(*, db: AsyncSession = Depends(get_db)) -> Any:
    """
    Fetch all cast iron
    """
    all_cast_iron = await crud.cast_iron.get_multi(db=db)
    if not all_cast_iron:
        return {"results": list()}

    return {"results": list(all_cast_iron)}

@router.get("/search/", status_code=200, response_model=CastIronSearchResults)
async def search_cast_iron(*, keyword: str = Query(None, min_length=3, example="grate"), db: AsyncSession = Depends(get_db)) -> dict:
    """
    Search for cast irons based on label keyword
    """
    cast_iron = await crud.cast_iron.get_multi(db=db)
    results = filter(lambda cast_iron: keyword.lower() in cast_iron.label.lower(), cast_iron)

    return {"results": list(results)}

@router.get("/{cast_iron_id}", status_code=200, response_model=CastIron)
async def fetch_item(*, cast_iron_id: int, db: AsyncSession = Depends(get_db)) -> Any:
    """
    Fetch a single cast iron by ID
    """
    result = await crud.cast_iron.get(db=db, id=cast_iron_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Item with ID {cast_iron_id} not found"
        )

    return result

@router.put("/", status_code=201, response_model=CastIron)
async def update_cast_iron(
    *,
    cast_iron_in: CastIronUpdateRestricted,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Update cast iron in the database.
    """
    cast_iron = await crud.cast_iron.get(db, id=cast_iron_in.id)
    if not cast_iron:
        raise HTTPException(
            status_code=400, detail=f"Cast Iron with ID: {cast_iron_in.id} not found."
        )

    if cast_iron.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only update your cast_irons."
        )

    updated_cast_iron = await crud.cast_iron.update(db=db, db_obj=cast_iron, obj_in=cast_iron_in)
    return updated_cast_iron

@router.post("/", status_code=201, response_model=CastIron)
async def create_cast_iron(*, cast_iron_in: CastIronCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(deps.get_current_user)) -> dict:
    """
    Create a new cast iron in the database.
    """
    if cast_iron_in.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only submit items as yourself"
        )
    cast_iron = await crud.cast_iron.create(db=db, obj_in=cast_iron_in)

    return cast_iron

@router.delete("/{cast_iron_id}", status_code=200)
async def remove_cast_iron(*, cast_iron_id: int, db: AsyncSession = Depends(get_db), current_user = Depends(deps.get_current_user)) -> Any:
    """
    Delete a cast iron by ID.
    """
    cast_iron = await crud.cast_iron.remove(db=db, id=cast_iron_id)

    return {"result": f"Cast Iron with ID: {cast_iron_id} deleted"}