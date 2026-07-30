from sqlalchemy.orm import Session
from app import models
from app import automation

# Create Device
def create_device(db: Session, device):

    new_device = models.Device(
        device_name=device.device_name,
        device_type=device.device_type,
        location=device.location,
        status=device.status,

        temperature=device.temperature,
        humidity=device.humidity,
        motion=device.motion,
        light_level=device.light_level
    )

    db.add(new_device)
    db.commit()
    db.refresh(new_device)

    return new_device


# Get All Devices
def get_devices(db: Session):
    return db.query(models.Device).all()


# Get One Device
def get_device(db: Session, device_id: int):
    return db.query(models.Device).filter(
        models.Device.id == device_id
    ).first()


# Update Device Status
def update_device_status(db: Session, device_id: int, status: str):

    device = db.query(models.Device).filter(
        models.Device.id == device_id
    ).first()

    if device is None:
        return {"message": "Device not found"}

    device.status = status

    db.commit()
    db.refresh(device)

    return device


# Update Sensor Data
def update_sensor_data(
    db: Session,
    device_id: int,
    temperature: float,
    humidity: float,
    motion: str,
    light_level: str
):

    device = db.query(models.Device).filter(
        models.Device.id == device_id
    ).first()

    if device is None:
        return {"message": "Device not found"}

    device.temperature = temperature
    device.humidity = humidity
    device.motion = motion
    device.light_level = light_level

    db.commit()
    db.refresh(device)

    return device
def update_device(
    db: Session,
    device_id: int,
    device
):

    existing = db.query(
        models.Device
    ).filter(
        models.Device.id == device_id
    ).first()

    if existing is None:

        return {
            "message": "Device not found"
        }

    existing.device_name = device.device_name
    existing.device_type = device.device_type
    existing.location = device.location
    existing.status = device.status
    existing.temperature = device.temperature
    existing.humidity = device.humidity
    existing.motion = device.motion
    existing.light_level = device.light_level

    db.commit()

    db.refresh(existing)

    return existing


# Delete Device
def delete_device(db: Session, device_id: int):

    device = db.query(models.Device).filter(
        models.Device.id == device_id
    ).first()

    if device is None:
        return {"message": "Device not found"}

    db.delete(device)
    db.commit()

    return {"message": "Device deleted successfully"}
# Run AI Automation
def run_automation(db: Session, device_id: int):

    device = db.query(models.Device).filter(
        models.Device.id == device_id
    ).first()

    if device is None:
        return {
            "message": "Device not found"
        }

    return automation.run_automation(device)
def save_automation_log(
    db: Session,
    device,
    result
):

    log = models.AutomationLog(

        device_id=device.id,

        device_name=device.device_name,

        temperature=device.temperature,

        humidity=device.humidity,

        motion=device.motion,

        fan_status=result["fan"],

        light_status=result["light"],

        decision=str(result["reason"])
    )

    db.add(log)

    db.commit()

    db.refresh(log)

    return log

def get_logs(db: Session):

    return db.query(
        models.AutomationLog
    ).all()
# ==========================
# Dashboard Summary
# ==========================

def get_dashboard_summary(db: Session):

    total_devices = db.query(models.Device).count()

    active_devices = db.query(models.Device).filter(
        models.Device.status == "ON"
    ).count()

    inactive_devices = db.query(models.Device).filter(
        models.Device.status == "OFF"
    ).count()

    automation_runs = db.query(
        models.AutomationLog
    ).count()

    return {
        "total_devices": total_devices,
        "active_devices": active_devices,
        "inactive_devices": inactive_devices,
        "automation_runs": automation_runs
    }
# ==========================
# Recent Automation Logs
# ==========================

def get_recent_logs(db: Session):

    logs = db.query(
        models.AutomationLog
    ).order_by(
        models.AutomationLog.id.desc()
    ).limit(10).all()

    return logs
# ==========================
# Device Type Statistics
# ==========================

def get_device_type_stats(db: Session):

    devices = db.query(models.Device).all()

    stats = {}

    for device in devices:

        if device.device_type in stats:

            stats[device.device_type] += 1

        else:

            stats[device.device_type] = 1

    return stats
# ==========================
# Temperature Analytics
# ==========================

def get_temperature_stats(db: Session):

    devices = db.query(models.Device).all()

    data = []

    for device in devices:

        data.append({
            "device_name": device.device_name,
            "temperature": device.temperature
        })

    return data


# ==========================
# Humidity Analytics
# ==========================

def get_humidity_stats(db: Session):

    devices = db.query(models.Device).all()

    data = []

    for device in devices:

        data.append({
            "device_name": device.device_name,
            "humidity": device.humidity
        })

    return data