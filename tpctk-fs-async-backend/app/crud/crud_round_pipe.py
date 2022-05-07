from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.base import CRUDBase
from app.models.user import User
from app.models.round_pipe import RoundPipe
from app.schemas.round_pipes import RoundPipeCreate, RoundPipeUpdate, RoundPipeUpdateRestricted
from typing import Union

class CRUDRound_Pipe(CRUDBase[RoundPipeCreate, RoundPipeUpdate, RoundPipeUpdateRestricted]):
    async def update(self, db: AsyncSession, *, db_obj: User, obj_in: Union[RoundPipeUpdate, RoundPipeUpdateRestricted]) -> RoundPipe:
        db_obj = await super().update(db, db_obj=db_obj, obj_in=obj_in)
        return db_obj

round_pipe = CRUDRound_Pipe(RoundPipe)