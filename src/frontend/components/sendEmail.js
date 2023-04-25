import React, { useState } from "react";
import "../styles/Loginstyle.css";

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
        <div className="img">
            <div className="blur">
                <div className="Forms">
                <h2>Problems logging in?</h2>
                <p>Enter the email address where you want to receive the link</p>
                    <div className="Container">
                        <form onSubmit={handleSubmit}>
                           
                            <input type="email" placeholder="Your email..." value={email} onChange={(event) => setEmail(event.target.value)}/>
                            <p>{message}</p>
                            <button className="btn" type="submit">Send password change link</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
