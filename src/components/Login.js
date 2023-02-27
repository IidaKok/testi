import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Login = () => {

    return (
        <div className="App">
            <form>
                <h2>Login</h2>
                <label>
                    User name:
                    <input type="text"></input>
                </label>
                <label>
                    Password:
                    <input type="text"></input>
                </label>
                <Link to="/userLogged"><button>Login</button></Link>

                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </form>
        </div>

    )
}
export { Login }