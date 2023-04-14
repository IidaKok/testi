import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export const NavBar = (props) => {

    const { userLogged } = props;

    const navigate = useNavigate();

    const logOut = () => {
        fetch('http://localhost:5000/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    userLogged(false);
                    navigate("/");
                } else {
                    console.error(response.statusText);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/series">Series</Link>
            <Link to="/userPage">UserPage</Link>
            <button onClick={() => logOut()}>Log out</button>
        </div>
    )
}