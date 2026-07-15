import enum
from sqlalchemy import String, Enum
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import Base

class Role(enum.Enum):
    ADMIN = "admin"
    DIRECTOR = "director"


class User(Base):
    __tablename__ = "users"

    uuid: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255))

    email: Mapped[str] = mapped_column(
        String(255),
        unique=True
    )

    password: Mapped[str] = mapped_column(String(255))

    role: Mapped[Role] = mapped_column(Enum(Role))

    submitted_feedback = relationship(
        "Feedback",
        foreign_keys="Feedback.user_id"
    )

    assigned_feedback = relationship(
        "Feedback",
        foreign_keys="Feedback.assigned_to"
    )