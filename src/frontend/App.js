import React from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { SeriesBrowser } from "./components/Browser";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { NotLogged } from "./pages/Home";
import { Logged } from "./pages/UserHome";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<NotLogged />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/userLogged" element={<Logged />} />
                <Route path="/series" element={<SeriesBrowser />} />
            </Routes>
        </Router>
    )
}

export default App
