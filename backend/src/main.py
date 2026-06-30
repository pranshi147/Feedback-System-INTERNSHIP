from fastapi import FastAPI
from src.database import Base, engine
from src.models.user import User

Base.metadata.create_all(bind=engine)
app = FastAPI()

@app.get("/")
def home():
    return {"message": "Feedback System Backend Running"}