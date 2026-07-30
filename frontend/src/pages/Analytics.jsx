import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import {
    getTemperature,
    getHumidity
} from "../services/api";

function Analytics() {

    const [temperature, setTemperature] = useState([]);
    const [humidity, setHumidity] = useState([]);

    useEffect(() => {

        loadCharts();

    }, []);

    async function loadCharts() {

        try {

            const temp = await getTemperature();

            const hum = await getHumidity();

            setTemperature(temp.data);

            setHumidity(hum.data);

        }

        catch (err) {

            console.log(err);

        }

    }

    return (

        <div>

            <h1 className="page-title">
                Analytics
            </h1>

            <p className="page-subtitle">
                Live Environmental Analytics
            </p>

            <div className="charts">

                <div className="chart-card">

                    <h2>🌡 Temperature</h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart data={temperature}>

                            <CartesianGrid strokeDasharray="3 3"/>

                            <XAxis dataKey="device_name"/>

                            <YAxis/>

                            <Tooltip/>

                            <Line
                                type="monotone"
                                dataKey="temperature"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                <div className="chart-card">

                    <h2>💧 Humidity</h2>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart data={humidity}>

                            <CartesianGrid strokeDasharray="3 3"/>

                            <XAxis dataKey="device_name"/>

                            <YAxis/>

                            <Tooltip/>

                            <Line
                                type="monotone"
                                dataKey="humidity"
                                stroke="#10b981"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default Analytics;