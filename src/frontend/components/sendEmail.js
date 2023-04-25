import React, { useState } from "react";
import "../styles/Loginstyle.css";
import { EmailSuccess } from "./SuccsessModal";
import { IoReturnUpBackOutline } from "react-icons/io5";

export const Email = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [style, setStyle] = useState("valid");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/api/users/send-email?email=${email}`)
            .then((response) => response.text())
            .then((msg) => {

                if (msg === "Email sent successfully") {
                    setModalOpen(true);
                    setEmail("");
                    setMessage("");
                    setStyle("valid");
                }
                else {
                    setMessage(msg);
                    setStyle("invalid");
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="img">
            <div className="blur">
                <div className="animate__animated animate__fadeIn animate__slow" style={{ animationDuration: "1s" }}>
                    <div className="Forms">
                        <div className="back">
                            <p style={{ cursor: "pointer" }} onClick={() => window.history.back()}><IoReturnUpBackOutline size="20px" />Return</p>
                            <div><h2>Problems logging in?</h2></div>
                        </div>
                        <p>Enter the email address where you want to receive the link</p>
                        <div className="Container">
                            <form onSubmit={handleSubmit}>

                                <input type="text" placeholder="Your email..." value={email} className={style} onChange={(event) => setEmail(event.target.value)} />
                                {modalOpen ? <EmailSuccess setModalOpen={setModalOpen} /> : <p>{message}</p>}
                                <button className="btn" type="submit">Send password change link</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
