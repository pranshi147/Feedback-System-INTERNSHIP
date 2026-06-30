from sqlalchemy import String, Integer, ARRAY
from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base


class Feedback(Base):
    __tablename__ = "feedback"
    uuid: Mapped[int] = mapped_column(primary_key=True)
    questions: Mapped[list[int]] = mapped_column(ARRAY(Integer))
    commentBox: Mapped[str] = mapped_column(String(1023))