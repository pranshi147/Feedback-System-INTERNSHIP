from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from src.database import Base


class Survey(Base):
    __tablename__ = "survey"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.uuid"),
        nullable=False
    )

    service = Column(String, nullable=False)

    duration = Column(String, nullable=False)

    quality_rating = Column(Integer, nullable=False)

    outcome_rating = Column(Integer, nullable=False)

    communication_rating = Column(Integer, nullable=False)

    recommendation_rating = Column(Integer, nullable=False)

    overall_rating = Column(Integer, nullable=False)

    suggestions = Column(String, nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    user = relationship("User")