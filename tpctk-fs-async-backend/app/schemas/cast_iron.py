from typing import Optional, Sequence

from pydantic import BaseModel
  

class CastIronBase(BaseModel):
    TPCTK_Code: Optional[str]
    label: Optional[str]
    Vulcan_style_code: Optional[str]
    EJ_code: Optional[str]
    SIP_code: Optional[str]
    Accucast_code: Optional[str]
    description: Optional[str]
    avg_weight: Optional[int]

# Properties to receive via API on creation
class CastIronCreate(CastIronBase):
    submitter_id: int

# Properties to receive via API on update
class CastIronUpdate(CastIronBase):
    id: int

class CastIronUpdateRestricted(BaseModel):
    id: int
    
class CastIronInDBBase(CastIronBase):
    id: int
    submitter_id: int

    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class CastIronInDB(CastIronInDBBase):
    ...

# Additional properties to return via API
class CastIron(CastIronInDBBase):
    ...

class CastIronSearchResults(BaseModel):
    results: Sequence[CastIron]