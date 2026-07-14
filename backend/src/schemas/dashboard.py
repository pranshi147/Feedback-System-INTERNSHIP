from pydantic import BaseModel


class RecentFeedback(BaseModel):
    id: int
    title: str
    category: str
    status: str

    class Config:
        from_attributes = True


class DashboardStats(BaseModel):
    total_feedback: int
    pending: int
    resolved: int
    rejected: int
    category_counts: dict[str, int]
    monthly_feedback: dict[str, int]
    recent_feedback: list[RecentFeedback]