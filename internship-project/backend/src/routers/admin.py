from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database import get_db
from src.core.permissions import admin_required
from src.models.user import User
from src.services.admin_service import get_all_users
from src.schemas.user import UserCreate
from src.services.admin_service import create_user
from src.services.admin_service import update_user
from src.services.admin_service import delete_user

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.get("/users")
def view_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return get_all_users(db)

@router.post("/users")
def add_user(
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return create_user(db, user)

@router.put("/users/{user_id}")
def edit_user(
    user_id: int,
    user: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return update_user(db, user_id, user)

@router.delete("/users/{user_id}")
def remove_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return delete_user(db, user_id)