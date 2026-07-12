from fastapi import APIRouter
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from src.core.dependencies import get_current_user
from src.models.user import User

from src.database import get_db
from src.schemas.login import LoginRequest
from src.services.user_service import get_user_by_email
from src.core.security import (
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/login")
def login(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    user = get_user_by_email(
    db,
    request.email
)
    if not user:
        raise HTTPException(
        status_code=401,
        detail="Invalid email or password"
    )
    if not verify_password(
    request.password,
    user.password
):
        raise HTTPException(
    status_code=401,
    detail="Invalid email or password"
)
    token = create_access_token(
    {
        "sub": user.email
    }
)
    return {
    "access_token": token,
    "token_type": "bearer"
}
@router.get("/me")
def get_me(
    current_user: User = Depends(get_current_user)
):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }
