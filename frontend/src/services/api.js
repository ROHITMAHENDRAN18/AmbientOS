import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

// =====================
// Dashboard
// =====================

export const getDashboard = () =>
    API.get("/dashboard");

export const getRecentLogs = () =>
    API.get("/dashboard/recent");

export const getDeviceTypes = () =>
    API.get("/dashboard/device-types");

export const getTemperature = () =>
    API.get("/dashboard/temperature");

export const getHumidity = () =>
    API.get("/dashboard/humidity");

// =====================
// Devices
// =====================

export const getDevices = () =>
    API.get("/devices");

export const createDevice = (data) =>
    API.post("/devices", data);

export const turnOn = (id) =>
    API.put(`/devices/${id}/on`);

export const turnOff = (id) =>
    API.put(`/devices/${id}/off`);

export const updateSensors = (id, data) =>
    API.put(`/devices/${id}/sensors`, data);

// =====================
// Automation
// =====================

export const runAutomation = (id) =>
    API.post(`/automation/run/${id}`);

export const getAutomationLogs = () =>
    API.get("/automation/logs");
export const getNotifications = () =>
    API.get("/notifications");
export const askAI = (message) =>
    API.post("/ai/chat", {
        message,
    });


export default API;