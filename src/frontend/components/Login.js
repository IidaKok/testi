import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Login = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [buttonPressed, setButtonPressed] = useState(false);

   /* useEffect( () => {
        console.log(query);
        const fetchUsers = async () => {
            let response = await fetch("http://localhost:5000/api/users/" + query);
            let c = await response.json();
            setUsers(c);
            
        }
        if ( query != '') fetchUsers();
    }, [query]);*/


    useEffect( () => {
        const fetchU = async () => {
            let response = await fetch("http://localhost:5000/api/users");
            let c = await response.json();
            setUsers(c);
        }

        fetchU();
    }, []);

    const allUsers = users.map((u) => {
        return (
            <li key={u.iduser}>{u.username}</li>
        )
    })

    const handleFetch = () => {
        setButtonPressed(true);
        let n = "";
        if (name !== "") n = name;
        /*let p = "";
        let and = "";

        if (name !== "" && password !== "") {
            n = "username=" + name;
            p = "password=" + password;
            and = "&";
        } 
        else {
            if (name !== "") n = "username=" + name;
            if (password !== "") p = "password=" + password;
        }*/
        setQuery(n);
    }

    return (
        <div className="App">
            <form>
                <h2>Login</h2>
                <label>
                    User name:
                    <input type="text" onChange={(e) => setName(e.target.value)}></input>
                </label>
                <label>
                    Password:
                    <input type="text" onChange={(e) => setPassword(e.target.value)}></input>
                </label>
                <Link><button onClick={() => handleFetch()}>Login</button></Link>

                <p>Don't have an account? <Link to="/register">Register</Link></p>   
            </form>
            {allUsers}
        </div>

    )
}
//<Link to="/userLogged"> {buttonPressed ? user : null}
export { Login }