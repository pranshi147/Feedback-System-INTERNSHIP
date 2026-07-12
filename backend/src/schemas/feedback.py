from pydantic import BaseModel


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

    class Config:
        from_attributes = True

class FeedbackStatusUpdate(BaseModel):
    status: str