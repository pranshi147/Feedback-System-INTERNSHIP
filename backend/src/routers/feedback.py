from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db
from src.core.dependencies import get_current_user
from src.models.user import User
from src.schemas.feedback import (
    FeedbackCreate,
    FeedbackResponse
)
from src.services.feedback_service import (
    create_feedback,
    get_all_feedback,
    get_feedback_by_user
)

router = APIRouter(
    prefix="/feedback",
    tags=["Feedback"]
)


@router.post(
    "/",
    response_model=FeedbackResponse
)
def submit_feedback(
    feedback: FeedbackCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_feedback(
        db,
        feedback,
        current_user.uuid
    )


@router.get(
    "/",
    response_model=list[FeedbackResponse]
)
def view_all_feedback(
    db: Session = Depends(get_db)
):
    return get_all_feedback(db)


@router.get(
    "/my",
    response_model=list[FeedbackResponse]
)
def my_feedback(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_feedback_by_user(
        db,
        current_user.uuid
    )