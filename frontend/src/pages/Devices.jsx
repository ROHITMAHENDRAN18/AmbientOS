import { useEffect, useState } from "react";

import AddDeviceModal from "../components/AddDeviceModal";
import EditDeviceModal from "../components/EditDeviceModal";
import DeleteModal from "../components/DeleteModal";

import {
    getDevices,
    turnOn,
    turnOff
} from "../services/api";

function Devices() {

    const [devices, setDevices] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [showEdit, setShowEdit] = useState(false);

    const [showDelete, setShowDelete] = useState(false);

    const [selectedDevice, setSelectedDevice] = useState(null);

    useEffect(() => {

    loadDevices();

    const interval = setInterval(() => {

        loadDevices();

    }, 5000);

    return () => clearInterval(interval);

}, []);

    async function loadDevices() {

        try {

            const response = await getDevices();

            setDevices(response.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    async function handleOn(id) {

        await turnOn(id);

        loadDevices();

    }
    async function handleOff(id) {

    try {

        await turnOff(id);

        await loadDevices();

    }

    catch(err){

        console.log(err);

    }

}

    function getRecommendation(device) {

    if (device.temperature > 30) {

        return "🔥 Temperature is High → Turn ON Fan";

    }

    if (device.temperature < 24) {

        return "❄ Room is Cool → Fan can be OFF";

    }

    if (device.motion === "Detected") {

        return "🚶 Motion Detected → Turn ON Lights";

    }

    if (device.motion === "No Motion") {

        return "💡 No Motion → Save Energy";

    }

    return "✅ Environment is Stable";

}

    return (

        <div>

            <h1 className="page-title">

                Smart Devices

            </h1>

            <p className="page-subtitle">

                Monitor & Control IoT Devices

            </p>

            <div className="device-header">

                <button

                    className="add-device-btn"

                    onClick={() => setShowModal(true)}

                >

                    ➕ Add Device

                </button>

            </div>

            {

                showModal && (

                    <AddDeviceModal

                        closeModal={() => setShowModal(false)}

                        refreshDevices={loadDevices}

                    />

                )

            }

            {

                showEdit &&

                selectedDevice && (

                    <EditDeviceModal

                        device={selectedDevice}

                        closeModal={() => setShowEdit(false)}

                        refreshDevices={loadDevices}

                    />

                )

            }

            {

                showDelete &&

                selectedDevice && (

                    <DeleteModal

                        device={selectedDevice}

                        closeModal={() => setShowDelete(false)}

                        refreshDevices={loadDevices}

                    />

                )

            }

            <div className="device-grid">

                {

                    devices.map((device) => (

                        <div

                            key={device.id}

                            className="device-card"

                        >

                            <h2>{device.device_name}</h2>

                            <p>

                                <b>Type :</b> {device.device_type}

                            </p>

                            <p>

                                <b>Location :</b> {device.location}

                            </p>

                           <div className="temp-circle">

                             <div className="temp-value">

                              {device.temperature}°

                               </div>

                            </div>

                            <p>

                                💧 {device.humidity} %

                            </p>
                            <p className="signal">

                                 📶 Excellent Signal

                             </p>

                             <div className="status-row">

                               <div

                            className={

                             device.status==="ON"

                               ?

                             "live-dot"

                              :

                               "dead-dot"

                               }

                              ></div>

                             <span

                              className={

                             device.status==="ON"

                                  ?

                              "status-on"

                               :

                              "status-off"

                               }

                                 >

                             {device.status}

                               </span>

                              </div>

                            <div className="btn-group">
                                <div className="ai-card">

                                      🤖

                                  {getRecommendation(device)}

                                  </div>

                                <button

                                    className="on-btn"

                                    onClick={() => handleOn(device.id)}

                                >

                                    Turn ON

                                </button>

                                <button

                                    className="off-btn"

                                    onClick={() => handleOff(device.id)}

                                >

                                    Turn OFF

                                </button>

                                <button

                                    className="edit-btn"

                                    onClick={() => {

                                        setSelectedDevice(device);

                                        setShowEdit(true);

                                    }}

                                >

                                    ✏ Edit

                                </button>

                                <button

                                    className="delete-btn"

                                    onClick={() => {

                                        setSelectedDevice(device);

                                        setShowDelete(true);

                                    }}

                                >

                                    🗑 Delete

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Devices;