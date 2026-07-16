from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class FeedbackCreate(BaseModel):
    title: str
    description: str
    category: str


class FeedbackResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    status: str
    assigned_to: Optional[int] = None
    reply: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class FeedbackStatusUpdate(BaseModel):
    status: str


class FeedbackReply(BaseModel):
    reply: str


class FeedbackAssign(BaseModel):
    director_id: int

