import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";


const Register = () => {
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);

    
    return (
        <div className="App">
            <form>
                <h2>Register</h2>
                <label>
                    User name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <label>
                    Password again:
                    <input type="text"></input>
                </label>
                <label>
                    Email:
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </label>
                <Link><button onClick={() => Register()}>Register</button></Link>

                <p>Already have an account? <Link to="/">Login</Link></p>
            </form>
        </div>
    )
}
export { Register }