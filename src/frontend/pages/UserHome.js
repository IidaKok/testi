import React from "react";
import "../App.css";


const Logged = (props) => {

    const {user} = props;

    return (
        <div className="App">
            <h1>Welcome</h1>
            <p>{user.username}</p>

            
        </div>
    )
}

export { Logged }