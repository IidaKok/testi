import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const NavBar = () => {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/series">Series</Link>
            <Link to="/userPage">UserPage</Link>
            <button>Log out</button>
        </div>
    )
}