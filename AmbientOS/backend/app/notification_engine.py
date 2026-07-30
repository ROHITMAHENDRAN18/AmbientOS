from app import crud

def generate_notifications(devices):

    notifications = []

    for device in devices:

        if device.temperature > 30:

            notifications.append({

                "type":"warning",

                "title":"Temperature High",

                "message":f"{device.device_name} is {device.temperature}°C"

            })

        if device.humidity < 40:

            notifications.append({

                "type":"info",

                "title":"Humidity Low",

                "message":f"{device.device_name} humidity is {device.humidity}%"

            })

    return notifications
