from sqlalchemy.orm import Session
from src.models.user import User
from src.core.security import hash_password
from fastapi import HTTPException
from src.models.user import Role
from sqlalchemy import or_, asc, desc, func


def get_all_users(
    db: Session,
    page=1,
    limit=10,
    search=None,
    role=None,
    sort="name",
    order="asc"
):
    query = db.query(User)

    # Search
    if search:
        query = query.filter(
            or_(
                User.name.ilike(f"%{search}%"),
                User.email.ilike(f"%{search}%")
            )
        )

    # Role filter
    if role:
        try:
            query = query.filter(User.role == Role[role.upper()])
        except KeyError:
            raise HTTPException(
                status_code=400,
                detail="Invalid role"
            )

    # Sorting
    sort_column = {
    "name": User.name,
    "email": User.email,
    "uuid": User.uuid,
}.get(sort, User.name)

    if order.lower() == "desc":
        query = query.order_by(desc(sort_column))
    else:
        query = query.order_by(asc(sort_column))

    total = query.count()

    users = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit,
        "users": users
    }

def create_user(db, user):
    new_user = User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

def update_user(db, user_id, user_data):
    user = db.query(User).filter(User.uuid == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.name = user_data.name
    user.email = user_data.email
    user.role = Role[user_data.role]

    if user_data.password:
        user.password = hash_password(user_data.password)

    db.commit()
    db.refresh(user)

    return user

def delete_user(db, user_id):
    user = db.query(User).filter(User.uuid == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully"}

def get_user_stats(db):
    total = db.query(User).count()

    admins = (
        db.query(User)
        .filter(User.role == Role.ADMIN)
        .count()
    )

    directors = (
        db.query(User)
        .filter(User.role == Role.DIRECTOR)
        .count()
    )

    return {
        "total": total,
        "admins": admins,
        "directors": directors,
    }

