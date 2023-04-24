import React, { useState } from "react";
import "../Loginstyle.css";

export const Email = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/api/users/send-email?email=${email}`)
            .then((response) => response.text())
            .then((msg) => {
                setMessage(msg);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="Forms">
            <div className="Container">
                <form onSubmit={handleSubmit}>
                    <label>
                        Recipient email:
                        <input type="email" placeholder="Your email..." value={email} onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>
                    <p>{message}</p>
                    <button type="submit">Reset password</button>
                </form>
            </div>
        </div>
    );
};
