from typing import Optional

from pydantic import BaseModel


class AddressBase(BaseModel):
    id: int
    street_address_1: str
    street_address_1: str
    city: str
    state_id: int
    country: str
    zipcode: str

# Properties to receive via API on creation
class AddressCreate(AddressBase):
    ...

# Properties to receive via API on update
class AddressUpdate(AddressBase):
    ...

class AddressInDBBase(AddressBase):
    id: Optional[int] = None

    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class  AddressInDB(AddressInDBBase):
    ...

# Additional properties to return via API
class Address(AddressInDBBase):
    ...