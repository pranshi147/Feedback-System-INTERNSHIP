from sqlalchemy.orm import Session

from src.models.feedback import Feedback


def get_dashboard_stats(db: Session):

    total = db.query(Feedback).count()

    pending = (
        db.query(Feedback)
        .filter(Feedback.status == "Pending")
        .count()
    )

    resolved = (
        db.query(Feedback)
        .filter(Feedback.status == "Resolved")
        .count()
    )

    rejected = (
        db.query(Feedback)
        .filter(Feedback.status == "Rejected")
        .count()
    )

    return {
        "total_feedback": total,
        "pending": pending,
        "resolved": resolved,
        "rejected": rejected
    }