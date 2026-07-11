from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String , Float

from .database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True)

    name = Column(String(100))

    email = Column(String(100))

class Device(Base):

    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)

    device_name = Column(String(100))

    device_type = Column(String(100))

    location = Column(String(100))

    status = Column(String(20)) 
    temperature = Column(Float)
    humidity = Column(Float)
    motion = Column(String(50))
    light_level = Column(String(50))
class AutomationLog(Base):

    __tablename__ = "automation_logs"

    id = Column(Integer, primary_key=True, index=True)

    device_id = Column(Integer)

    device_name = Column(String(100))

    temperature = Column(Float)

    humidity = Column(Float)

    motion = Column(String(50))

    fan_status = Column(String(20))

    light_status = Column(String(20))

    decision = Column(String(255))
    