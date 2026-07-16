from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import Query
from src.database import get_db
from src.core.dependencies import get_current_user
from src.models.user import User
from src.schemas.feedback import FeedbackReply
from src.schemas.feedback import FeedbackStatusUpdate
from src.schemas.feedback import FeedbackAssign
from src.services.feedback_service import update_feedback_status
from src.schemas.feedback import (
    FeedbackCreate,
    FeedbackResponse
)
from src.services.feedback_service import (
    create_feedback,
    get_all_feedback,
    get_feedback_by_user,
    reply_to_feedback,
    assign_feedback,
    get_directors,
)
from src.core.permissions import (
    admin_required
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
    search: Optional[str] = None,
    category: Optional[str] = None,
    status: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return get_all_feedback(
        db=db,
        search=search,
        category=category,
        status=status,
        page=page,
        limit=limit
    )


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

@router.patch(
    "/{feedback_id}"
)
def change_status(
    feedback_id: int,
    request: FeedbackStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    feedback = update_feedback_status(
        db,
        feedback_id,
        request.status
    )

    if feedback is None:
        raise HTTPException(
            status_code=404,
            detail="Feedback not found"
        )

    return feedback

@router.patch(
    "/{feedback_id}/reply"
)
def send_reply(
    feedback_id: int,
    request: FeedbackReply,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    feedback = reply_to_feedback(
        db,
        feedback_id,
        request.reply
    )

    if feedback is None:
        raise HTTPException(
            status_code=404,
            detail="Feedback not found"
        )

    return feedback

@router.get("/directors")
def list_directors(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return get_directors(db)


@router.put("/{feedback_id}/assign")
def assign_feedback_to_director(
    feedback_id: int,
    request: FeedbackAssign,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    feedback = assign_feedback(
    db,
    feedback_id,
    request.director_id
)

    if feedback is None:
        raise HTTPException(
            status_code=404,
            detail="Feedback or Director not found"
        )

    return feedback

