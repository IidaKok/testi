import React from "react";
import { Link } from "react-router-dom";

export const NavBar = () => {
    return (
        <div style={{backgroundColor: "grey"}}>
            <Link to="/">Home</Link>
            <Link to="/series">Series</Link>
            <Link to="/userPage">UserPage</Link>
        </div>
    )
}