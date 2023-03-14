import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const NotLogged = () => {
    return (
        <div className="App">
            <h1>User is not logged</h1>

            {/*if link is pressed, links are not visible*/}
            <div>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}


export { NotLogged }