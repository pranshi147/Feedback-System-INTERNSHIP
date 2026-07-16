# Feedback Management System

A full-stack **Feedback Management System** built with **React**, **FastAPI**, and **PostgreSQL**. The application allows users to submit feedback and customer satisfaction surveys while providing administrators with tools to manage feedback, assign requests, reply to users, and analyze survey results.

---

## Features

### Authentication & Authorization
- JWT Authentication
- Secure password hashing using bcrypt
- Role-Based Access Control (Admin/User/Director)
- Protected API endpoints

### Feedback Module
- Submit feedback
- View personal feedback history
- Track feedback status
- Receive admin replies
- Admin can:
  - View all feedback
  - Search feedback
  - Filter by category
  - Filter by status
  - Update feedback status
  - Reply to users
  - Assign feedback to directors

### Survey Module
Users can submit customer satisfaction surveys including:
- Service used
- Duration of service usage
- Ratings for:
  - Quality of Service
  - Outcome Delivered
  - Communication & Support
  - Recommendation
  - Overall Satisfaction
- Suggestions & comments

### Survey Analytics
Administrators can view:
- Total survey responses
- Average ratings
- Customer Satisfaction (CSAT) Score
- Individual survey responses

### User Management
- View registered users
- User statistics dashboard

---

# Tech Stack

## Frontend
- React
- React Router
- Axios
- Tailwind CSS
- React Hot Toast

## Backend
- FastAPI
- SQLAlchemy
- Alembic
- Pydantic
- JWT Authentication
- Passlib (bcrypt)

## Database
- PostgreSQL

---

# Project Structure

```
Feedback-Management-System
│
├── backend
│   ├── alembic
│   ├── src
│   │   ├── core
│   │   ├── database.py
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   ├── services
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Prerequisites

Before running the project, install:

- Python 3.11+
- Node.js 18+
- PostgreSQL
- Git

---

# Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/feedback-management-system.git

cd feedback-management-system
```

---

# Backend Setup

## 1. Navigate to backend

```bash
cd backend
```

---

## 2. Create Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Create PostgreSQL Database

Create a PostgreSQL database.

Example:

```
feedback_db
```

---

## 5. Configure Environment Variables

Create a file named

```
.env
```

inside the **backend** folder.

Example:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/feedback_db

SECRET_KEY=your_secret_key_here

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=60
```

Replace:

- your_password
- feedback_db
- secret key

with your own values.

---

## 6. Run Database Migrations

```bash
alembic upgrade head
```

---

## 7. (Optional) Create Admin User

The project does not automatically create an administrator.

Create one manually in PostgreSQL or by using your preferred database client.

Example:

```
Role: ADMIN
Email: admin@example.com
Password: (bcrypt hashed)
```

---

## 8. Start Backend

```bash
uvicorn src.main:app --reload
```

Backend will run at

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

Open another terminal.

Navigate to frontend.

```bash
cd frontend
```

Install packages.

```bash
npm install
```

Start React.

```bash
npm run dev
```

Frontend will run at

```
http://localhost:5173
```

---

# Running the Application

Start **both**:

Backend

```
uvicorn src.main:app --reload
```

Frontend

```
npm run dev
```

Open

```
http://localhost:5173
```

---

# API Endpoints

## Authentication

```
POST /auth/login
GET  /auth/me
```

## Feedback

```
POST   /feedback
GET    /feedback
GET    /feedback/my
PATCH  /feedback/{id}
PATCH  /feedback/{id}/reply
PATCH  /feedback/{id}/assign
GET    /feedback/directors
```

## Users

```
GET /admin/users
GET /admin/users/stats
```

## Survey

```
POST /survey
GET  /survey
GET  /survey/my
GET  /survey/stats
```

---

# Future Improvements

- Email notifications
- File attachments
- Export reports
- Charts for analytics
- Dark mode
- Real-time notifications

---

# Learning Outcomes

This project helped strengthen my understanding of:

- Full Stack Development
- REST APIs
- JWT Authentication
- SQLAlchemy ORM
- Alembic Migrations
- PostgreSQL
- React Context API
- CRUD Operations
- Pagination
- Search & Filtering
- Role-Based Access Control
- Backend–Frontend Integration

---

# Author

**Pranshi Mittal**

GitHub:
https://github.com/pranshi147

LinkedIn:
(Add your LinkedIn profile)

---

# License

This project is intended for learning and educational purposes.