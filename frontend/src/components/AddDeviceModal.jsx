import { useState } from "react";
import { createDevice } from "../services/api";

function AddDeviceModal({ closeModal, refreshDevices }) {

    const [form, setForm] = useState({

        device_name: "",

        device_type: "",

        location: "",

        status: "OFF",

        temperature: 25,

        humidity: 50,

        motion: "No Motion",

        light_level: "Medium"

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

            await createDevice(form);

            refreshDevices();

            closeModal();

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div className="modal-overlay">

            <div className="modal-box">

                <h2>Add New Device</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="device_name"
                        placeholder="Device Name"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="device_type"
                        placeholder="Device Type"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="temperature"
                        placeholder="Temperature"
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="humidity"
                        placeholder="Humidity"
                        onChange={handleChange}
                    />

                    <select
                        name="motion"
                        onChange={handleChange}
                    >

                        <option>No Motion</option>

                        <option>Detected</option>

                    </select>

                    <select
                        name="light_level"
                        onChange={handleChange}
                    >

                        <option>Low</option>

                        <option>Medium</option>

                        <option>High</option>

                    </select>

                    <div className="modal-buttons">

                        <button
                            type="submit"
                            className="save-btn"
                        >
                            Save Device
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

export default AddDeviceModal;