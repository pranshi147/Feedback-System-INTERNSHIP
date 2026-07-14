from pydantic import EmailStr, BaseModel #type: ignore
from pydantic import BaseModel
from src.models.user import Role
import enum

class Role(str, enum.Enum):
    ADMIN = "ADMIN"
    DIRECTOR = "DIRECTOR"

class BaseUser(BaseModel):
    name: str
    uuid: int
    email: EmailStr
    password: str #encrypted
    role: Role

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: Role

class UserUpdate(BaseModel):
    name: str
    email: str
    role: Role