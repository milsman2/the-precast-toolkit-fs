from typing import Optional, Sequence

from pydantic import BaseModel
  

class RoundPipeBase(BaseModel):
    material: str
    inner_diameter: float
    outer_diameter: float

# Properties to receive via API on creation
class RoundPipeCreate(RoundPipeBase):
    submitter_id: int

# Properties to receive via API on update
class RoundPipeUpdate(RoundPipeBase):
    id: int

class RoundPipeUpdateRestricted(BaseModel):
    id: int

class RoundPipeInDBBase(RoundPipeBase):
    id: int
    submitter_id: int

    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class RoundPipeIronInDB(RoundPipeInDBBase):
    ...

# Additional properties to return via API
class RoundPipe(RoundPipeInDBBase):
    ...

class RoundPipeSearchResults(BaseModel):
    results: Sequence[RoundPipe]