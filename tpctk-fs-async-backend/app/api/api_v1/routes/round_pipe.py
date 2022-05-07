from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db

from app import crud
from app.api import deps
from app.schemas.round_pipes import (
    RoundPipe,
    RoundPipeCreate,
    RoundPipeSearchResults,
    RoundPipeUpdateRestricted
)
from app.models.user import User

router = APIRouter()

@router.get("/all-pipes/", status_code=200, response_model=RoundPipeSearchResults)
async def get_user_items(*, db: AsyncSession = Depends(get_db)) -> Any:
    """
    Fetch all pipes
    """
    all_pipe = await crud.round_pipe.get_multi(db=db)
    if not all_pipe:
        return {"results": list()}

    return {"results": list(all_pipe)}

@router.get("/{pipe_id}", status_code=200, response_model=RoundPipe)
async def fetch_item(*, pipe_id: int, db: AsyncSession = Depends(get_db)) -> Any:
    """
    Fetch a single round pipe by ID
    """
    result = await crud.round_pipe.get(db=db, id=pipe_id)
    if not result:
        # the exception is raised, not returned - you will get a validation
        # error otherwise.
        raise HTTPException(
            status_code=404, detail=f"Item with ID {pipe_id} not found"
        )

    return result

@router.get("/search/", status_code=200, response_model=RoundPipeSearchResults)
async def search_pipe(*, keyword: str = Query(None, min_length=3, example="grate"), db: AsyncSession = Depends(get_db)) -> dict:
    """
    Search for pipe based on label keyword
    """
    pipe = await crud.round_pipe.get_multi(db=db)
    results = filter(lambda pipe: keyword.lower() in pipe.label.lower(), pipe)

    return {"results": list(results)}

@router.put("/", status_code=201, response_model=RoundPipe)
async def update_round_pipe(
    *,
    pipe_in: RoundPipeUpdateRestricted,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> dict:
    """
    Update pipe in the database.
    """
    pipe = await crud.round_pipe.get(db, id=pipe_in.id)
    if not pipe:
        raise HTTPException(
            status_code=400, detail=f"Pipe with ID: {pipe_in.id} not found."
        )

    if pipe.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only update your pipes."
        )

    updated_pipe = await crud.round_pipe.update(db=db, db_obj=pipe, obj_in=pipein)
    return updated_pipe

@router.post("/", status_code=201, response_model=RoundPipe)
async def create_pipe(*, pipe_in: RoundPipeCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(deps.get_current_user)) -> dict:
    """
    Create a new pipe in the database.
    """
    if pipe_in.submitter_id != current_user.id:
        raise HTTPException(
            status_code=403, detail=f"You can only submit items as yourself"
        )
    pipe = await crud.round_pipe.create(db=db, obj_in=pipe_in)

    return pipe

@router.delete("/{id}", status_code=200)
async def remove_pipe(*, pipe_id: int, db: AsyncSession = Depends(get_db), current_user = Depends(deps.get_current_user)) -> Any:
    """
    Delete a pipe by ID.
    """
    pipe = await crud.round_pipe.remove(db=db, id=pipe_id)

    return {"result": f"Pipe with ID: {pipe_id} deleted"}