from sqlalchemy.orm import Session
from sqlalchemy import func, extract

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

    monthly_data = (
    db.query(
        extract("month", Feedback.created_at),
        func.count(Feedback.id)
    )
    .group_by(extract("month", Feedback.created_at))
    .order_by(extract("month", Feedback.created_at))
    .all()
    )

    months = {
        1: "Jan",
        2: "Feb",
        3: "Mar",
        4: "Apr",
        5: "May",
        6: "Jun",
        7: "Jul",
        8: "Aug",
        9: "Sep",
        10: "Oct",
        11: "Nov",
        12: "Dec",
    }

    monthly_feedback = {
        months[int(month)]: count
        for month, count in monthly_data
    }

    return {
        "total_feedback": total,
        "pending": pending,
        "resolved": resolved,
        "rejected": rejected,
        "category_counts": category_counts
    }