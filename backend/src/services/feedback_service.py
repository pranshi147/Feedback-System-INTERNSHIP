from sqlalchemy.orm import Session

from src.models.feedback import Feedback
from src.schemas.feedback import FeedbackCreate


def create_feedback(
    db: Session,
    feedback: FeedbackCreate,
    user_id: int
):
    new_feedback = Feedback(
        title=feedback.title,
        description=feedback.description,
        category=feedback.category,
        user_id=user_id
    )

    db.add(new_feedback)
    db.commit()
    db.refresh(new_feedback)

    return new_feedback


def get_all_feedback(db: Session):
    return db.query(Feedback).all()


def get_feedback_by_user(
    db: Session,
    user_id: int
):
    return (
        db.query(Feedback)
        .filter(Feedback.user_id == user_id)
        .all()
    )