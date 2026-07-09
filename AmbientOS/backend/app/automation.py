"""
AmbientOS AI Automation Engine

This file contains all AI automation rules
for controlling smart devices based on
sensor values.
"""
"""
AmbientOS AI Automation Engine
"""

from app import models


def run_automation(device: models.Device):

    fan_status = device.status
    light_status = "OFF"

    fan_reason = "No change"
    light_reason = "No change"

    # Rule 1: Temperature Control
    if device.temperature > 30:
        fan_status = "ON"
        fan_reason = "Temperature is above 30°C"

    elif device.temperature < 24:
        fan_status = "OFF"
        fan_reason = "Temperature is below 24°C"

    else:
        fan_reason = "Temperature is in normal range"

    # Rule 2: Motion Detection
    if device.motion == "Detected":
        light_status = "ON"
        light_reason = "Motion detected"

    elif device.motion == "No Motion":
        light_status = "OFF"
        light_reason = "No motion detected"

    else:
        light_reason = "Motion status unknown"

    return {
        "device_id": device.id,
        "device_name": device.device_name,
        "temperature": device.temperature,
        "humidity": device.humidity,
        "motion": device.motion,
        "fan": fan_status,
        "light": light_status,
        "reason": {
            "fan": fan_reason,
            "light": light_reason
        }
    }