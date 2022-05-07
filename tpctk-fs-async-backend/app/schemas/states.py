from typing import Optional

from pydantic import BaseModel


class StateBase(BaseModel):
    id: int
    name: str

# Properties to receive via API on creation
class StateCreate(StateBase):
    ...

# Properties to receive via API on update
class StatesUpdate(StateBase):
    ...

class StateInDBBase(StateBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class  StateInDB(StateInDBBase):
    ...

# Additional properties to return via API
class State(StateInDBBase):
    ...