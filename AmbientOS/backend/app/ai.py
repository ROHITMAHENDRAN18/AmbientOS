from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()


class AIRequest(BaseModel):
    message: str


@router.post("/chat")
def chat(data: AIRequest):

    msg = data.message.lower()

    if "fan" in msg and "on" in msg:
        return {
            "reply": "Turning ON Bedroom Fan."
        }

    elif "fan" in msg and "off" in msg:
        return {
            "reply": "Turning OFF Bedroom Fan."
        }

    elif "light" in msg and "on" in msg:
        return {
            "reply": "Turning ON Living Room Light."
        }

    elif "light" in msg and "off" in msg:
        return {
            "reply": "Turning OFF Living Room Light."
        }

    elif "hello" in msg:

        return {
            "reply": "Hello Rohit 👋"
        }

    return {
        "reply": "Sorry, I didn't understand."
    }