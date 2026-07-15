from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from src.database import get_db
from src.core.permissions import admin_required
from src.models.user import User
from src.services.admin_service import get_all_users
from src.schemas.user import UserCreate
from src.services.admin_service import create_user
from src.services.admin_service import update_user
from src.services.admin_service import delete_user
from src.services.admin_service import update_user
from src.schemas.user import UserUpdate

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)

@router.get("/users")
def view_users(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: str | None = None,
    role: str | None = None,
    sort: str = "name",
    order: str = "asc",
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    return get_all_users(
        db=db,
        page=page,
        limit=limit,
        search=search,
        role=role,
        sort=sort,
        order=order
    )

@router.post("/users")
def add_user(
    user: UserUpdate,
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

