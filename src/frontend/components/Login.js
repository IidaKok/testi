import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Loginstyle.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Login = (props) => {

    const { saveUser } = props;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessage2, setErrorMessage2] = useState("");
    const [invalidName, setInvalidName] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);


    useEffect(() => {
        console.log(query);
        const fetchUsers = async () => {
            await fetch("http://localhost:5000/api/users/" + query)
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === undefined) {
                        saveUser({ username: data.username, password: data.password, email: data.email, iduser: data.iduser });
                        setInvalidName(false);
                        setInvalidPassword(false);
                        return;
                    }
                    let msg = data.message;
                    console.log("Message: ", msg);
                    
                    if (msg.includes("Password")) {
                        setErrorMessage2(msg);
                        setInvalidPassword(true);
                    }
                    else if (msg.includes("Username")) {
                        setErrorMessage(msg);
                        setInvalidName(true);
                    }
                });
        }
        if (query !== "") fetchUsers();
    }, [query]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setButtonPressed(true);
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
            let q = [];
            if (name !== "") q.push(name);
            if (password !== "") q.push(password);
            setQuery(q.join("&")); 
        }
    }
    return (
        <div className="Forms">
            <p>muuttuuko?</p>
            <h2>Login</h2>
            <div className="Container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" value={name} className={invalidName ? "invalid" : "valid"} onChange={(e) => setName(e.target.value)} placeholder="Username..." />
                    <p data-testid="nameError">{errorMessage}</p>
                    <input type="password" value={password} className={invalidPassword ? "invalid" : "valid"} onChange={(e) => setPassword(e.target.value)} placeholder="Password..." />
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