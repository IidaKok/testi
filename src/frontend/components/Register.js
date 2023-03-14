import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Register = () => {
    return (
        <div className="App">
            <form>
                <h2>Register</h2>
                <label>
                    Name:
                    <input type="text"></input>
                </label>
                <label>
                    User name:
                    <input type="text"></input>
                </label>
                <label>
                    Password:
                    <input type="text"></input>
                </label>
                <label>
                    Password again:
                    <input type="text"></input>
                </label>
                <Link to="/login"><button>Register</button></Link>

                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    )
}

export {Register}