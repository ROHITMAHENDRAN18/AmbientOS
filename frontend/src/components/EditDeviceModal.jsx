import { useState } from "react";
import axios from "axios";

function EditDeviceModal({

    device,

    closeModal,

    refreshDevices

}) {

    const [form, setForm] = useState({

        device_name: device.device_name,

        device_type: device.device_type,

        location: device.location,

        status: device.status,

        temperature: device.temperature,

        humidity: device.humidity,

        motion: device.motion,

        light_level: device.light_level

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await axios.put(

                `http://127.0.0.1:8000/devices/${device.id}`,

                form

            );

            refreshDevices();

            closeModal();

        }

        catch(err){

            console.log(err);

        }

    }

    return(

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>Edit Device</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="device_name"
                        value={form.device_name}
                        onChange={handleChange}
                    />

                    <input
                        name="device_type"
                        value={form.device_type}
                        onChange={handleChange}
                    />

                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                    />

                    <input
                        name="temperature"
                        type="number"
                        value={form.temperature}
                        onChange={handleChange}
                    />

                    <input
                        name="humidity"
                        type="number"
                        value={form.humidity}
                        onChange={handleChange}
                    />

                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >

                        <option>ON</option>

                        <option>OFF</option>

                    </select>

                    <select
                        name="motion"
                        value={form.motion}
                        onChange={handleChange}
                    >

                        <option>No Motion</option>

                        <option>Detected</option>

                    </select>

                    <select
                        name="light_level"
                        value={form.light_level}
                        onChange={handleChange}
                    >

                        <option>Low</option>

                        <option>Medium</option>

                        <option>High</option>

                    </select>

                    <div className="modal-buttons">

                        <button
                            className="save-btn"
                        >
                            Update Device
                        </button>

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={closeModal}

                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditDeviceModal;