from pydantic import EmailStr, BaseModel #type: ignore


from enum import Enum
class Role:
    DIRECTOR = "director"
    ADMIN  = "admin"

class BaseUser(BaseModel):
    name: str
    uuid: int
    email: EmailStr
    password: str #encrypted
    role: Role