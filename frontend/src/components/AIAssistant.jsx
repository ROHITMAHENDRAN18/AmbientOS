import { useState } from "react";
import "./AIAssistant.css";

function AIAssistant() {

    const [open, setOpen] = useState(false);

    return (

        <>

            <button

                className="ai-float"

                onClick={() => setOpen(!open)}

            >

                🤖

            </button>

            {

                open && (

                    <div className="ai-popup">

                        <div className="ai-header">

                            AmbientOS AI

                        </div>

                        <div className="ai-body">

                            Hello Rohit 👋

                            <br /><br />

                            I am your AmbientOS Assistant.

                        </div>

                    </div>

                )

            }

        </>

    );

}

export default AIAssistant;