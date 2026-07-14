from sqlalchemy.orm import Session
from src.models.user import User
from src.core.security import hash_password
from fastapi import HTTPException
from src.models.user import Role


def get_all_users(db: Session):
    return db.query(User).all()

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