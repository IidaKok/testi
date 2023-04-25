import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "../styles/Loginstyle.css";
import { Error } from "./InvalidInput";
import { PasswordSuccess } from "./SuccsessModal";


export const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [type, setType] = useState("password");
    const [buttonPressed, setButtonPressed] = useState(false);
    let location = useLocation();
    const path = location.pathname;
    const tokenfromUrl = path.substring(path.lastIndexOf("/") + 1);
    const [modalOpen, setModalOpen] = useState(false);

    const resett = async () => {
        setButtonPressed(true);
        if (!validPassword) {
            try {
                const response = await fetch(`http://localhost:5000/api/users/changePassword/${tokenfromUrl}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ password: password }),
                });
                if (!response.ok) {
                    const data = await response.json();
                    console.log(data);
                    alert(data.message);
                }
                else {
                    const data = await response.json();
                    setModalOpen(true);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    //password validation
    useEffect(() => {
        const lowerCase = /[a-z]/g;
        const upperCase = /[A-Z]/g;
        const numbers = /[1-9]/g;

        if (password.length < 5 || !password.match(lowerCase) || !password.match(upperCase) || !password.match(numbers)) {
            setValidPassword(true);
        }
        else {
            setValidPassword(false);
        }
    }, [password]);

    //show password
    const showPassword = (e) => {
        if (e) {
            setType("text");
        }
        else setType("Password");
    }

    return (
        <div className="img">
            <div className="blur">
                <div className="animate__animated animate__fadeIn animate__slow" style={{ animationDuration: "1s" }}>
                    <div className="Forms">
                        <h2>Change password</h2>
                        <div className="Container">

                            <input type={type} placeholder="New password..." className={validPassword && buttonPressed ? "invalid" : "valid"} onChange={(e) => setPassword(e.target.value)} />
                            <input type="checkbox" style={{ cursor: "pointer" }} onChange={(e) => showPassword(e.target.checked)} /><label>Show Password</label>
                            {validPassword && buttonPressed ? <Error id="invalidPasswordError" value="Password" text="at least 5 characters, a lowercase letter, an uppercase letter and a number" /> :
                                null}
                                {modalOpen && <PasswordSuccess setModalOpen={setModalOpen}/>}
                            <br />
                            <button className="btn" onClick={() => resett()}>Change password</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}