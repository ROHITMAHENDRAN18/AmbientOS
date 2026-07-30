import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import NotificationPanel from "../components/NotificationPanel";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function Dashboard() {

    const [summary, setSummary] = useState({
        total_devices: 0,
        active_devices: 0,
        inactive_devices: 0,
        automation_runs: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {

        try {

            const response = await getDashboard();

            setSummary(response.data);

        } catch (error) {

            console.log("Dashboard Error:", error);

        }

    }

    const COLORS = ["#22c55e", "#ef4444"];

    const pieData = [
        {
            name: "Active",
            value: summary.active_devices,
        },
        {
            name: "Inactive",
            value: summary.inactive_devices,
        },
    ];

    const barData = [
        {
            name: "Devices",
            value: summary.total_devices,
        },
        {
            name: "Automation",
            value: summary.automation_runs,
        },
    ];

    return (

        <div>

            <h1 className="page-title">
                AmbientOS Dashboard
            </h1>

            <p className="page-subtitle">
                Smart Environment Monitoring
            </p>

            {/* ============================= */}
            {/* Notification Panel */}
            {/* ============================= */}

            <NotificationPanel />

            {/* ============================= */}
            {/* Dashboard Cards */}
            {/* ============================= */}

            <div className="dashboard-grid">

                <div className="dashboard-card">
                    <h2>💻 Total Devices</h2>
                    <h1>{summary.total_devices}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🟢 Active Devices</h2>
                    <h1>{summary.active_devices}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🔴 Inactive Devices</h2>
                    <h1>{summary.inactive_devices}</h1>
                </div>

                <div className="dashboard-card">
                    <h2>🤖 Automation Runs</h2>
                    <h1>{summary.automation_runs}</h1>
                </div>

            </div>

            {/* ============================= */}
            {/* Charts */}
            {/* ============================= */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "30px",
                    marginTop: "40px"
                }}
            >

                {/* Pie Chart */}

                <div className="dashboard-card">

                    <h2 style={{ marginBottom: "20px" }}>
                        Device Status
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <PieChart>

                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >

                                {

                                    pieData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))

                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

                {/* Bar Chart */}

                <div className="dashboard-card">

                    <h2 style={{ marginBottom: "20px" }}>
                        System Statistics
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={320}
                    >

                        <BarChart data={barData}>

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                fill="#2563eb"
                                radius={[10, 10, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;