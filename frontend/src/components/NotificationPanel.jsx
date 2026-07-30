import { useEffect, useState } from "react";
import { getNotifications } from "../services/api";


function NotificationPanel() {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        load();

        const interval = setInterval(load, 5000);

        return () => clearInterval(interval);

    }, []);

    async function load() {

        const res = await getNotifications();

        setNotifications(res.data);

    }

    return (

        <div className="notification-panel">

            <h2>🔔 Notifications</h2>

            {

                notifications.map((n,index)=>(

                    <div

                        key={index}

                        className={`notify ${n.type}`}

                    >

                        <h4>{n.title}</h4>

                        <p>{n.message}</p>

                    </div>

                ))

            }

        </div>

    );

}

export default NotificationPanel;