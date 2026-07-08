from sqlalchemy.orm import Session
from app import models

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