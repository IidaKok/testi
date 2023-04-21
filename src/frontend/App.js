import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
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
    const [token, setToken] = useState('');

    useEffect(() => {
       /* const fetchUser = async () => {
            const response = await fetch('http://localhost:5000/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log("data /: ", data);

            if (data.loggedIn) {
                setLogged(true);
                await fetch('http://localhost:5000/user/' + data.iduser)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log("data /user: ", data);
                        setUser(data[0]);
                    });
            }
            else {
                setLogged(false);
            }
        };*/

        const fetchUser = () => {
             try {
                 fetch('http://localhost:5000/', {
                     credentials: 'include',
                 })
                     .then((res) => res.json())
                     .then((data) => {
                         console.log("data: ", data);
                         if (data.loggedIn) {
                             setLogged(true);
                             console.log("data.user: ", data.user[0])
                             setUser(data.user[0]);
                         }
                         if (!data.loggedIn) {
                             setLogged(false);
                         }
                     })
             } catch (error) {
                 console.error(error);
             }
         };
        fetchUser();
    }, [logged]);
    console.log("logged: ", logged);
    console.log("token: ", token);
    console.log("user: ", user);



    return (
        <Router>
            {logged ? <NavBar userLogged={setLogged} /> : null}
            <Routes>
                <Route path="/" element={
                    logged ? <Logged user={user} /> : <Login saveToken={setToken} userLogged={setLogged} />} />
                <Route path="/register" element={<Register />} />

                <Route path="/series" element={
                    logged ? <SeriesBrowser user={user} /> : <Login userLogged={setLogged} />} />

                <Route path="/series/books/:idbookseries" element={
                    logged ? <SeriesInfo user={user} /> : <Login userLogged={setLogged} />} />

                <Route path="/series/books/book/:idbook" element={
                    logged ? <BookInfo user={user} /> : <Login userLogged={setLogged} />} />

                <Route path="/userPage" element={
                    logged ? <UserPage user={user} /> : <Login userLogged={setLogged} />} />

                <Route path="/Addbook" element={
                    logged ? <Addbook user={user} /> : <Login userLogged={setLogged} />} />

                <Route path="/Addseries" element={
                    logged ? <Addseries /> : <Login userLogged={setLogged} />} />

                <Route path="/update/:idbookshelf" element={
                    logged ? <Update user={user} /> : <Login userLogged={setLogged} />} />
            </Routes>
        </Router>
    )
}
export default App