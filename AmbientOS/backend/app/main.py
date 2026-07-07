from fastapi import FastAPI

app = FastAPI(
    title="AmbientOS API",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "project": "AmbientOS",
        "message": "Welcome to AmbientOS Backend 🚀"
    }

@app.get("/health")
def health():
    return {
        "status": "Healthy",
        "backend": "Running"
    }
@app.get("/about")
def about():
    return {
        "project": "AmbientOS",
        "version": "1.0",
        "developer": "Rohit Mahendran",
        "description": "AI Operating System for Smart Environments"
    }