import { Link } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2>AmbientOS</h2>

            <nav>

                <Link to="/">🏠 Dashboard</Link>

                <Link to="/devices">💻 Devices</Link>

                <Link to="/analytics">📊 Analytics</Link>

                <Link to="/automation">🤖 Automation</Link>

            </nav>

        </div>

    );

}

export default Sidebar;