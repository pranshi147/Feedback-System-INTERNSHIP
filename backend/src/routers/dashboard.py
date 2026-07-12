from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db
from src.schemas.dashboard import DashboardStats
from src.services.dashboard_service import get_dashboard_stats
from src.core.permissions import admin_required
from src.models.user import User

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get(
    "/stats",
    response_model=DashboardStats
)
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return get_dashboard_stats(db)