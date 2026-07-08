from pydantic import BaseModel

class Device(BaseModel):

    device_name: str

    device_type: str

    location: str

    status: str