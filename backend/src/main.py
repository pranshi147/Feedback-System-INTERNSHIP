from fastapi import FastAPI

from src.database import Base, engine

# Import all models here
from src.models.user import User
from src.models.feedback import Feedback

from src.routers import auth
from src.routers import feedback

app = FastAPI()

app.include_router(auth.router)
app.include_router(feedback.router)


@app.get("/")
def home():
    return {
        "message": "Feedback System Backend Running"
    }