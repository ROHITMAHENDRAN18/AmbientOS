from sqlalchemy.orm import Session
from app import models


# Create Device
def create_device(db: Session, device):

    new_device = models.Device(
        device_name=device.device_name,
        device_type=device.device_type,
        location=device.location,
        status=device.status
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