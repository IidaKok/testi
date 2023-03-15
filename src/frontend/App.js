import React, {useState} from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Logged } from "./pages/UserHome";
import { SeriesBrowser } from "./components/Browser";
import { NavBar } from "./components/NavBar";

const App = () => {
    const [user, setUser] = useState("");

    return (
        <Router>
            {user ? <NavBar/> : null}
            <Routes>
                <Route path="/" element={
                user ? <Logged user={user}/> : <Login  saveUser={setUser}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/series" element={<SeriesBrowser />} />
            </Routes>
        </Router>
    )
}
/*<Router>
            {user ? <NavBar/> : null}
            <Routes>
                <Route path="/" element={
                user ? <Logged user={user}/> : <Login  saveUser={setUser}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/series" element={<SeriesBrowser />} />
            </Routes>
        </Router>*/
export default App