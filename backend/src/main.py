from fastapi import FastAPI
from src.database import Base, engine
from src.models.user import User
from src.routers import auth

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.include_router(auth.router)

@app.get("/")
def home():
    return {"message": "Feedback System Backend Running"}

