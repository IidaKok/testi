import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, HashRouter as Router} from "react-router-dom";
import { Logged } from "./pages/UserHome";
import { SeriesBrowser, SeriesInfo, BookInfo } from "./components/Browser";
import { NavBar } from "./components/NavBar";
import { UserPage } from "./components/UserPage";
import { Addbook } from "./components/Addbook";
import { Addseries } from "./components/Addseries";
import { Update } from "./components/Update";

const App = () => {
    const [user, setUser] = useState("");
    const [logged, setLogged] = useState(null);

    useEffect(() => {
        const fetchUser = () => {
            try {
                fetch('http://localhost:5000', {
                    credentials: 'include',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("data: ", data);
                        if (data.loggedIn) {
                            localStorage.setItem('username', data.username);
                            localStorage.setItem('iduser', data.iduser);
                            localStorage.setItem('loggedIn', true);
                            setLogged(true);
                            setUser(data);
                        }
                        if (!data.loggedIn) {
                            localStorage.setItem('loggedIn', false);
                            localStorage.setItem('username', null);
                            localStorage.setItem('iduser', null);
                            setLogged(false);
                        }
                    })
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [logged]);

    return (
        <Router>
            {logged ? <NavBar userLogged={setLogged} /> : null}
            <Routes>
                <Route path="/" element={
                    logged ? <Logged user={user} /> : <Login userLogged={setLogged}/>} />
                <Route path="/register" element={<Register />} />

                <Route path="/series" element={
                logged ? <SeriesBrowser user={user} /> : <Login userLogged={setLogged}/>} />

                <Route path="/series/books/:idbookseries" element={
                    logged ? <SeriesInfo user={user} /> : <Login userLogged={setLogged}/>} />

                <Route path="/series/books/book/:idbook" element={
                    logged ? <BookInfo user={user} /> : <Login userLogged={setLogged}/>} />

                <Route path="/userPage" element={
                    logged ? <UserPage user={user} /> : <Login userLogged={setLogged}/>} />

                <Route path="/Addbook" element={
                    logged ? <Addbook user={user} /> : <Login userLogged={setLogged}/>} />

                <Route path="/Addseries" element={
                    logged ? <Addseries /> : <Login userLogged={setLogged}/>} />

                <Route path="/update/:idbookshelf" element={
                    logged ? <Update user={user} /> : <Login userLogged={setLogged}/>} />
            </Routes>
        </Router>
    )
}
export default App