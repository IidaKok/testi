import React, {useState} from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Logged } from "./pages/UserHome";

const App = () => {
    const [user, setUser] = useState("");

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                user ? <Logged user={user}/> : <Login  saveUser={setUser}/>} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default App