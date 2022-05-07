from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud
from app import schemas
from app.api import deps
from app.core.auth import (
    authenticate,
    create_access_token,
)
from app.db.session import get_db
from app.models.user import User

router = APIRouter()


@router.post("/login/")
async def login(db: AsyncSession = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()) -> Any:
    """
    Get the JWT for a user with data from OAuth2 request form body.
    """
    user = await authenticate(email=form_data.username, password=form_data.password, db=db)
    if not user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {
        "access_token": await create_access_token(sub=user.id),
        "token_type": "bearer",
    }


@router.get("/me/", response_model=schemas.User)
async def read_users_me(current_user: User = Depends(deps.get_current_user)):
    """
    Fetch the current logged in user.
    """
    user = current_user
    return user


"""
@router.post("/signup/", response_model=schemas.User, status_code=201)
async def create_user_signup(*, db: AsyncSession = Depends(get_db), user_in: schemas.user.UserCreate) -> Any:
    users = await db.execute(select(User).where(User.email == user_in.email))
    user = users.scalars().first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system",
        )
    user = await crud.user.create(db=db, obj_in=user_in)

    return user
"""