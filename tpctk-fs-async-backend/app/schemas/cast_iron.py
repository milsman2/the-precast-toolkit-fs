from typing import Optional, Sequence

from pydantic import BaseModel
  

class CastIronBase(BaseModel):
    TPCTK_Code: str
    label: str
    Vulcan_style_code: str
    EJ_code: str
    SIP_code: str
    Accucast_code: str
    description: str
    avg_weight: int

# Properties to receive via API on creation
class CastIronCreate(CastIronBase):
    submitter_id: int

# Properties to receive via API on update
class CastIronUpdate(CastIronBase):
    id: int

class CastIronUpdateRestricted(BaseModel):
    id: int
    TPCTK_Code: str
    label: str
    Vulcan_style_code: str
    EJ_code: str
    SIP_code: str
    Accucast_code: str
    description: str
    avg_weight: int
    
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