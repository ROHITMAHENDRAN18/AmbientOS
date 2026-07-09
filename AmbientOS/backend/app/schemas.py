from pydantic import BaseModel

class Device(BaseModel):

    device_name: str
    device_type: str
    location: str
    status: str

    temperature: float
    humidity: float
    motion: str
    light_level: str


class DeviceResponse(Device):

    id: int

    class Config:
        from_attributes = True
class SensorUpdate(BaseModel):

    temperature: float
    humidity: float
    motion: str
    light_level: str