from app.database import engine
from app.database import Base

import app.models

from fastapi import FastAPI, Depends

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app import schemas

from app import crud


app = FastAPI(
    title="AmbientOS API",
    version="1.0.0"
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
Base.metadata.create_all(bind=engine)
@app.get("/")
def home():
    return {
        "project": "AmbientOS",
        "message": "Welcome to AmbientOS Backend 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "backend": "Running"
    }
@app.get("/about")
def about():
    return {
        "project": "AmbientOS",
        "version": "1.0",
        "developer": "Rohit Mahendran",
        "description": "AI Operating System for Smart Environments"
    }
@app.post("/devices")
def add_device(
    device: schemas.Device,
    db: Session = Depends(get_db)
):
    return crud.create_device(db, device)