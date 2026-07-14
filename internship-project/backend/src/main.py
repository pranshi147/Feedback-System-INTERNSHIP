from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers import admin
from src.routers import auth
from src.routers import feedback
from src.routers import dashboard

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router)
app.include_router(feedback.router)
app.include_router(dashboard.router)
app.include_router(admin.router)


@app.get("/")
def home():
    return {
        "message": "Feedback System Backend Running"
    }