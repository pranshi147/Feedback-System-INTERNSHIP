from sqlalchemy.orm import Session
from sqlalchemy import func

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

    category_data = (
        db.query(
            Feedback.category,
            func.count(Feedback.id)
        )
        .group_by(Feedback.category)
        .all()
    )

    category_counts = {
        category: count
        for category, count in category_data
    }

    return {
        "total_feedback": total,
        "pending": pending,
        "resolved": resolved,
        "rejected": rejected,
        "category_counts": category_counts
    }