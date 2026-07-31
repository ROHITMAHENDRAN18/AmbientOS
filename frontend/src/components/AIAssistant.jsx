import "./AIAssistant.css";
import { useState } from "react";
import { askAI } from "../services/api";

function AIAssistant() {

    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "Hello Rohit 👋"
        }
    ]);

    const [input, setInput] = useState("");

    async function sendMessage() {

        if (!input.trim()) return;

        const user = {
            sender: "user",
            text: input
        };

        setMessages(prev => [...prev, user]);

        try {

            const response = await askAI(input);

            const ai = {
                sender: "ai",
                text: response.data.reply
            };

            setMessages(prev => [...prev, ai]);

        } catch {

            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    text: "Server Error"
                }
            ]);

        }

        setInput("");

    }

    return (

        <div className="ai-box">

            <div className="ai-header">

                AmbientOS AI

            </div>

            <div className="ai-chat">

                {

                    messages.map((msg, index) => (

                        <div
                            key={index}
                            className={
                                msg.sender === "user"
                                    ? "user-msg"
                                    : "ai-msg"
                            }
                        >

                            {msg.text}

                        </div>

                    ))

                }

            </div>

            <div className="ai-input">

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a command..."
                />

                <button onClick={sendMessage}>

                    Send

                </button>

            </div>

        </div>

    );

}

export default AIAssistant;