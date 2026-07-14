from fastapi import Depends, HTTPException

from src.core.dependencies import get_current_user
from src.models.user import User, Role


def admin_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != Role.ADMIN:
        raise HTTPException(
            status_code=403,
            detail="Admin access required"
        )

    return current_user


def director_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.role != Role.DIRECTOR:
        raise HTTPException(
            status_code=403,
            detail="Director access required"
        )

    return current_user


def admin_or_director_required(
    current_user: User = Depends(get_current_user)
):
    if current_user.role not in [
        Role.ADMIN,
        Role.DIRECTOR
    ]:
        raise HTTPException(
            status_code=403,
            detail="Access denied"
        )

    return current_user