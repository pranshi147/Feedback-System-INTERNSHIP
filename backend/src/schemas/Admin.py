from .BaseUser import BaseUser, Role
from sqlalchemy import String, Enum as SQLEnum
from sqlalchemy.orm import Mapped, mapped_column

class Admin(BaseUser):
    name: Mapped[str] = mapped_column(String(255))
    uuid: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)
    password: Mapped[str] = mapped_column(String(255))
    role: Mapped[Role] = mapped_column(SQLEnum(Role))



    def __repr__(self):
        return f"<User(id={self.uuid}, Name={self.name}, role={self.role})>"