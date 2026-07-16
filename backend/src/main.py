from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Request

from src.routers import auth
from src.routers import feedback
from src.routers import dashboard
from src.routers import admin   
from src.routers import survey

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_request(request: Request, call_next):
    print("=" * 60)
    print("PATH:", request.url.path)
    print("AUTH:", request.headers.get("authorization"))
    response = await call_next(request)
    print("STATUS:", response.status_code)
    return response

# Routers
app.include_router(auth.router)
app.include_router(feedback.router)
app.include_router(dashboard.router)
app.include_router(admin.router)   
app.include_router(survey.router)

@app.get("/")
def home():
    return {
        "message": "Feedback System Backend Running"
    }