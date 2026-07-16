from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class SurveyCreate(BaseModel):
    service: str
    duration: str

    quality_rating: int
    outcome_rating: int
    communication_rating: int
    recommendation_rating: int
    overall_rating: int

    suggestions: Optional[str] = None


class SurveyResponse(BaseModel):
    id: int
    user_id: int

    service: str
    duration: str

    quality_rating: int
    outcome_rating: int
    communication_rating: int
    recommendation_rating: int
    overall_rating: int

    suggestions: Optional[str]

    created_at: datetime

    class Config:
        from_attributes = True


class SurveyStats(BaseModel):
    total_responses: int
    average_quality: float
    average_outcome: float
    average_communication: float
    average_recommendation: float
    average_overall: float
    csat_score: float