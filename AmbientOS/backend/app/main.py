from app.database import engine
from app.database import Base
from app import notification_engine
import app.models

from fastapi import FastAPI, Depends

from sqlalchemy.orm import Session

from app.database import SessionLocal

from app import schemas

from app import crud
from app import automation
from fastapi.middleware.cors import CORSMiddleware
from app.ai import router as ai_router
tags_metadata = [

    {
        "name": "General",
        "description": "General API Endpoints"
    },

    {
        "name": "Devices",
        "description": "Manage Smart Devices"
    },

    {
        "name": "Automation",
        "description": "AI Automation Engine"
    },

    {
        "name": "Dashboard",
        "description": "Dashboard Analytics"
    }

]


app = FastAPI(

    title="AmbientOS API",

    description="""
AmbientOS is an AI-powered Smart Environment Operating System.

Features

• Device Management

• Sensor Monitoring

• AI Automation

• Automation Logs

• Dashboard Analytics

• Device Statistics

Built Using

• FastAPI

• SQLAlchemy

• MySQL

• Python

""",

    version="1.0.0",

    contact={
        "name": "Rohit Mahendran",
        "email": "rohit@example.com"
    },

    license_info={
        "name": "MIT License"
    },

    openapi_tags=tags_metadata
    

)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
Base.metadata.create_all(bind=engine)
@app.get(
    "/",
    tags=["General"],
    summary="Home",
    description="Welcome endpoint of AmbientOS"
)
def home():
    return {
        "project": "AmbientOS",
        "message": "Welcome to AmbientOS Backend 🚀"
    }

@app.get(
    "/health",
    tags=["General"],
    summary="Health Check",
    description="Check whether backend is running"
)
def health():
    return {
        "status": "Healthy",
        "backend": "Running"
    }
@app.get(
    "/about",
    tags=["General"],
    summary="About Project",
    description="Returns project information"
)
def about():
    return {
        "project": "AmbientOS",
        "version": "1.0",
        "developer": "Rohit Mahendran",
        "description": "AI Operating System for Smart Environments"
    }
@app.post(
    "/devices",
    tags=["Devices"],
    summary="Create Device",
    description="Register a new smart device"
)
def add_device(
    device: schemas.Device,
    db: Session = Depends(get_db)
):
    return crud.create_device(db, device)

@app.get(
    "/devices",
    tags=["Devices"],
    summary="Get All Devices",
    description="Returns all registered smart devices"
)
def get_all_devices(
    db: Session = Depends(get_db)
):
    return crud.get_devices(db)

@app.put(
    "/devices/{device_id}/on",
    tags=["Devices"],
    summary="Turn ON Device"
)
def turn_on_device(
    device_id: int,
    db: Session = Depends(get_db)
):
    return crud.update_device_status(
        db,
        device_id,
        "ON"
    )

@app.put(
    "/devices/{device_id}/off",
    tags=["Devices"],
    summary="Turn OFF Device"
)
def turn_off_device(
    device_id: int,
    db: Session = Depends(get_db)
):
    return crud.update_device_status(
        db,
        device_id,
        "OFF"
    )
@app.post(
    "/automation/run/{device_id}",
    tags=["Automation"],
    summary="Run AI Automation",
    description="Runs AI automation rules for a device"
)
def run_ai_automation(
    device_id: int,
    db: Session = Depends(get_db)
):

    device = crud.get_device(db, device_id)

    if device is None:
        return {
            "message": "Device not found"
        }

    result = automation.run_automation(device)

    crud.save_automation_log(
        db,
        device,
        result
    )

    return result
@app.put(
    "/devices/{device_id}/sensors",
    tags=["Devices"],
    summary="Update Sensor Data"
)
def update_sensor_data(
    device_id: int,
    sensor: schemas.SensorUpdate,
    db: Session = Depends(get_db)
):
    return crud.update_sensor_data(
        db,
        device_id,
        sensor.temperature,
        sensor.humidity,
        sensor.motion,
        sensor.light_level
    )
@app.get(
    "/automation/logs",
    tags=["Automation"],
    summary="Automation Logs",
    description="Returns all automation history"
)
def automation_logs(
    db: Session = Depends(get_db)
):

    return crud.get_logs(db)

# ==========================
# Dashboard Summary
# ==========================

@app.get(
    "/dashboard",
    tags=["Dashboard"],
    summary="Dashboard Summary"
)
def dashboard_summary(
    db: Session = Depends(get_db)
):

    return crud.get_dashboard_summary(db)
# ==========================
# Dashboard Recent Logs
# ==========================

@app.get(
    "/dashboard/recent",
    tags=["Dashboard"],
    summary="Recent Automation Logs"
)
def dashboard_recent_logs(
    db: Session = Depends(get_db)
):

    return crud.get_recent_logs(db)
# ==========================
# Device Type Statistics
# ==========================

@app.get(
    "/dashboard/device-types",
    tags=["Dashboard"],
    summary="Device Type Statistics"
)
def device_type_statistics(
    db: Session = Depends(get_db)
):

    return crud.get_device_type_stats(db)
# ==========================
# Temperature Analytics
# ==========================

@app.get(
    "/dashboard/temperature",
    tags=["Dashboard"],
    summary="Temperature Analytics"
)
def dashboard_temperature(
    db: Session = Depends(get_db)
):

    return crud.get_temperature_stats(db)
# ==========================
# Humidity Analytics
# ==========================

@app.get(
    "/dashboard/humidity",
    tags=["Dashboard"],
    summary="Humidity Analytics"
)
def dashboard_humidity(
    db: Session = Depends(get_db)
):

    return crud.get_humidity_stats(db)
@app.put("/devices/{device_id}")
def edit_device(

    device_id: int,

    device: schemas.DeviceUpdate,

    db: Session = Depends(get_db)

):

    return crud.update_device(

        db,

        device_id,

        device

    )
@app.get("/notifications")
def notifications(db: Session = Depends(get_db)):

    devices = crud.get_devices(db)

    return notification_engine.generate_notifications(devices)
app.include_router(
    ai_router,
    prefix="/ai",
    tags=["AI Assistant"]
)