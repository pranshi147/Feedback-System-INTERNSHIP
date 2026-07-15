from datetime import datetime

from sqlalchemy import String, ForeignKey, DateTime, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship


from src.database import Base


class Feedback(Base):
    __tablename__ = "feedback"

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str] = mapped_column(String(200))

    description: Mapped[str] = mapped_column(String(2000))

    category: Mapped[str] = mapped_column(String(100))

    status: Mapped[str] = mapped_column(
        String(50),
        default="Pending"
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow
    )

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.uuid")
    )

    assigned_to: Mapped[int | None] = mapped_column(
    ForeignKey("users.uuid"),
    nullable=True
)
    
    creator = relationship(
    "User",
    foreign_keys=[user_id]
)

    assignee = relationship(
    "User",
    foreign_keys=[assigned_to]
)

    reply: Mapped[str | None] = mapped_column(
    Text,
    nullable=True
)