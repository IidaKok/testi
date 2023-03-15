import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Login = (props) => {

    const { saveUser } = props;

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);

    useEffect(() => {
        console.log(query);
        const fetchUsers = async () => {
            let response = await fetch("http://localhost:5000/api/users/" + query);
            if(response.ok){
                let c = await response.json();
                setUsers(c);
                saveUser({ username: c.username, password: c.password, email: c.email, iduser: c.iduser });
            }
            else {
                console.log("jokin meni pieleen");
            }
        }
        if (query !== '') fetchUsers();
    }, [query]);

    const handleFetch = () => {
        setButtonPressed(true);
        let q = [];
        if (name !== "") q.push(name);
        if (password !== "") q.push(password);

        setQuery(q.join("&"));
    }

    return (
        <div className="App">
            <div>
                <h1>User is not logged</h1>

            </div>
                <h2>Login</h2>
                <label>
                    User name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
                </label>
                <label>
                    Password:
                    <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <button onClick={() => handleFetch()}>Login</button>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            

            {buttonPressed ? <p>{users.email}</p> : null}
        </div>
    )
}
export { Login }