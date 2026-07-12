from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from src.database import get_db
from src.core.security import verify_access_token
from src.services.user_service import get_user_by_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("=" * 50)
    print("TOKEN:", token)

    payload = verify_access_token(token)
    print("PAYLOAD:", payload)

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    email = payload.get("sub")
    print("EMAIL:", email)

    user = get_user_by_email(db, email)
    print("USER:", user)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user