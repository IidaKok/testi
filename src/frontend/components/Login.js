import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../Loginstyle.css";
import "../Loginstyle.css";

const Login = (props) => {

    const { saveUser } = props;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        console.log(query);
        const fetchUsers = async () => {
            let response = await fetch("http://localhost:5000/api/users/" + query);
            if (response.ok) {
                let c = await response.json();
                setUsers(c);
                saveUser({ username: c.username, password: c.password, email: c.email, iduser: c.iduser });
            }
            else {
                setErrorMessage("Username or password is incorrect. Try again");
            }
        }
        if (query !== '') fetchUsers();
    }, [query]);


    const handleSubmit = (event) => {
        event.preventDefault();
        setButtonPressed(true);
        let q = [];
        if (name !== "") q.push(name);
        if (password !== "") q.push(password);

        setQuery(q.join("&"));
    }

    return (
        <div className="Forms">
            <h2>Login</h2>
            <div className="Container">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Username..."/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password..."/>
                    <p>{errorMessage}</p>
                    <input type="submit" value="Login" />
                </form>
            </div>

            <div className="Container">
                <p>Don't have an account? <Link to="/register">Register</Link></p>

            </div>
        </div>
    )
}
export { Login }