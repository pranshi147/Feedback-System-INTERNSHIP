from sqlalchemy.orm import Session
from sqlalchemy import func
from src.models.survey import Survey
from src.schemas.survey import SurveyCreate


def create_survey(
    db: Session,
    survey: SurveyCreate,
    user_id: int
):
    new_survey = Survey(
        user_id=user_id,

        service=survey.service,
        duration=survey.duration,

        quality_rating=survey.quality_rating,
        outcome_rating=survey.outcome_rating,
        communication_rating=survey.communication_rating,
        recommendation_rating=survey.recommendation_rating,
        overall_rating=survey.overall_rating,

        suggestions=survey.suggestions,
    )

    db.add(new_survey)
    db.commit()
    db.refresh(new_survey)

    return new_survey


def get_my_surveys(
    db: Session,
    user_id: int
):
    return (
        db.query(Survey)
        .filter(Survey.user_id == user_id)
        .order_by(Survey.created_at.desc())
        .all()
    )


def get_all_surveys(
    db: Session
):
    return (
        db.query(Survey)
        .order_by(Survey.created_at.desc())
        .all()
    )


def get_survey_stats(db):
    total = db.query(func.count(Survey.id)).scalar()

    if total == 0:
        return {
            "total_responses": 0,
            "average_quality": 0,
            "average_outcome": 0,
            "average_communication": 0,
            "average_recommendation": 0,
            "average_overall": 0,
            "csat_score": 0,
        }

    avg_quality = db.query(func.avg(Survey.quality_rating)).scalar()
    avg_outcome = db.query(func.avg(Survey.outcome_rating)).scalar()
    avg_communication = db.query(func.avg(Survey.communication_rating)).scalar()
    avg_recommendation = db.query(func.avg(Survey.recommendation_rating)).scalar()
    avg_overall = db.query(func.avg(Survey.overall_rating)).scalar()

    satisfied = (
        db.query(func.count(Survey.id))
        .filter(Survey.overall_rating >= 4)
        .scalar()
    )

    csat = (satisfied / total) * 100

    return {
        "total_responses": total,
        "average_quality": round(avg_quality, 2),
        "average_outcome": round(avg_outcome, 2),
        "average_communication": round(avg_communication, 2),
        "average_recommendation": round(avg_recommendation, 2),
        "average_overall": round(avg_overall, 2),
        "csat_score": round(csat, 2),
    }