import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "../App.css";

export const NavBar = (props) => {

    const {setLoggedIn} = props;
const logOut = async () => {
    fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          // Remove the session ID from the cookie or local storage
          document.cookie = 'sessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          setLoggedIn(false);
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