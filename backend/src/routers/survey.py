from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db
from src.core.dependencies import get_current_user
from src.core.permissions import admin_required
from src.schemas.survey import SurveyStats

from src.models.user import User

from src.schemas.survey import (
    SurveyCreate,
    SurveyResponse,
)

from src.services.survey_service import (
    create_survey,
    get_my_surveys,
    get_all_surveys,
    get_survey_stats
)

router = APIRouter(
    prefix="/survey",
    tags=["Survey"]
)


@router.post(
    "/",
    response_model=SurveyResponse
)
def submit_survey(
    survey: SurveyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_survey(
        db,
        survey,
        current_user.uuid
    )


@router.get(
    "/my",
    response_model=list[SurveyResponse]
)
def my_surveys(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_my_surveys(
        db,
        current_user.uuid
    )


@router.get(
    "/",
    response_model=list[SurveyResponse]
)
def all_surveys(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required),
):
    return get_all_surveys(db)


@router.get(
    "/stats",
    response_model=SurveyStats
)
def survey_statistics(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return get_survey_stats(db)