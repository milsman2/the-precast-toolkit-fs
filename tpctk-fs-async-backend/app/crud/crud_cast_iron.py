from sqlalchemy.ext.asyncio import AsyncSession
from app.crud.base import CRUDBase
from app.models.user import User
from app.models.cast_iron import Cast_Iron
from app.schemas.cast_iron import CastIronCreate, CastIronUpdate, CastIronUpdateRestricted
from typing import Union

class CRUDCast_Iron(CRUDBase[Cast_Iron, CastIronCreate, CastIronUpdate]):
    async def update(self, db: AsyncSession, *, db_obj: User, obj_in: Union[CastIronUpdate, CastIronUpdateRestricted]) -> Cast_Iron:
        db_obj = await super().update(db, db_obj=db_obj, obj_in=obj_in)
        return db_obj

cast_iron = CRUDCast_Iron(Cast_Iron)