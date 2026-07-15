from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr

class Role(str, Enum):
    DIRECTOR = "director"
    ADMIN = "admin"


class UserBase(BaseModel):
    name: str
    email: EmailStr
    role: Role

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserResponse(UserBase):
    uuid: int

    class Config:
        from_attributes = True