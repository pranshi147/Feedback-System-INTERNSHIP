from sqlalchemy.orm import Session
from sqlalchemy import or_

from src.models.feedback import Feedback
from src.models.user import User, Role
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


def get_all_feedback(
    db: Session,
    search: str | None = None,
    category: str | None = None,
    status: str | None = None,
    page: int = 1,
    limit: int = 10
):
    query = db.query(Feedback)

    if search:
        query = query.filter(
            or_(
                Feedback.title.ilike(f"%{search}%"),
                Feedback.description.ilike(f"%{search}%")
            )
        )

    if category:
        query = query.filter(
            Feedback.category == category
        )

    if status:
        query = query.filter(
            Feedback.status == status
        )

    return (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )


def get_feedback_by_user(
    db: Session,
    user_id: int
):
    return (
        db.query(Feedback)
        .filter(Feedback.user_id == user_id)
        .all()
    )


def update_feedback_status(
    db: Session,
    feedback_id: int,
    status: str
):
    feedback = (
        db.query(Feedback)
        .filter(Feedback.id == feedback_id)
        .first()
    )

    if feedback is None:
        return None

    feedback.status = status

    db.commit()
    db.refresh(feedback)

    return feedback


def reply_to_feedback(
    db: Session,
    feedback_id: int,
    reply: str
):
    feedback = (
        db.query(Feedback)
        .filter(Feedback.id == feedback_id)
        .first()
    )

    if feedback is None:
        return None

    feedback.reply = reply

    db.commit()
    db.refresh(feedback)

    return feedback


# -------------------------
# NEW FUNCTIONS
# -------------------------

def assign_feedback(
    db: Session,
    feedback_id: int,
    director_id: int | None,
):
    feedback = (
        db.query(Feedback)
        .filter(Feedback.id == feedback_id)
        .first()
    )

    if feedback is None:
        return None

    if director_id is not None:
        director = (
            db.query(User)
            .filter(User.uuid == director_id)
            .first()
        )

        if director is None:
            return None

        if director.role != Role.DIRECTOR:
            return None

    feedback.assigned_to = director_id

    db.commit()
    db.refresh(feedback)

    return feedback


def get_directors(db: Session):
    return (
        db.query(User)
        .filter(User.role == Role.DIRECTOR)
        .all()
    )