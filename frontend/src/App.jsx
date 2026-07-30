 import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import Analytics from "./pages/Analytics";
import Automation from "./pages/Automation";
import AIAssistant from "./components/AIAssistant";

function App() {

    return (

        <BrowserRouter>

            <div className="layout">

                <Sidebar />

                <div className="content">

                    <Routes>

                        <Route
                            path="/"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/devices"
                            element={<Devices />}
                        />

                        <Route
                            path="/analytics"
                            element={<Analytics />}
                        />

                        <Route
                            path="/automation"
                            element={<Automation />}
                        />

                    </Routes>

                    <AIAssistant />

                </div>

            </div>

        </BrowserRouter>

    );

}

export default App;