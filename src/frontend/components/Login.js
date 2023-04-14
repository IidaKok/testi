import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Loginstyle.css";

const Login = (props) => {

    const { userLogged } = props;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [invalidName, setInvalidName] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage("");
        setErrorMessage2("");
        setInvalidName(false);
        setInvalidPassword(false);

        if (name === "") {
            setInvalidName(true);
            setErrorMessage("Username can't be empty");
        }
        if (password === "") {
            setInvalidPassword(true);
            setErrorMessage2("Password can't be empty");
        }
        else {
            fetch('http://localhost:5000/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: name,
                    password: password
                }),
                credentials: 'include'
            })
                .then(response => {
                    if (response.ok) {
                        userLogged(true);
                        localStorage.setItem("loggedIn", true);
                        console.log("response ok");
                        setInvalidName(false);
                         setInvalidPassword(false);

                    }
                    if(response.status === 404) {
                        const s = response.json();
                        s.then((data) => {
                            console.log(data.message);
                            if (data.message.includes("Password")) {
                                setErrorMessage2(data.message);
                                setInvalidPassword(true);
                            }
                            else if (data.message.includes("Username")) {
                                setErrorMessage(data.message);
                                setInvalidName(true);
                            }
                        });
                    }
                    else {
                        console.error(response.statusText);
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }
    return (
        <div className="Forms">
            <h2>Login</h2>
            <div className="Container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" name="username" value={name} className={invalidName ? "invalid" : "valid"} onChange={(e) => setName(e.target.value)} placeholder="Username..." />
                    <p data-testid="nameError">{errorMessage}</p>
                    <input name="password" type="password" value={password} className={invalidPassword ? "invalid" : "valid"} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
                    <p data-testid="passError">{errorMessage2}</p>
                    <input data-testid="logBtn" type="submit" value="Login" />
                </form>
            </div>


            <div className="Container">
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}
export { Login }