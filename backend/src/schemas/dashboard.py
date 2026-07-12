from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_feedback: int
    pending: int
    resolved: int
    rejected: int