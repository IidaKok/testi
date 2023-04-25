import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export const NavBar = (props) => {

    const { userLogged, user } = props;
    const navigate = useNavigate();

    const logOut = async () => {
        await fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            credentials: 'include'
        })
            .then(response => {
                if (response.ok) {
                    navigate("/");
                    userLogged(false);
                } else {
                    console.error(response.message);
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
            <Link to="/userPage">User Page</Link>
            <p>{user.username}
            <Link className="logout" onClick={() => logOut()}>Log out</Link></p>
        </div>
    )
}