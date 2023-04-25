import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { Logged } from "./pages/UserHome";
import { SeriesBrowser } from "./components/Browser";
import { BookInfo } from "./components/BrowserBookInfo";
import { SeriesInfo } from "./components/BrowserSeriesInfo";
import { NavBar } from "./components/NavBar";
import { UserPage } from "./components/UserPage";
import { Addbook } from "./components/Addbook";
import { Addseries } from "./components/Addseries";
import { Update } from "./components/Update";
import { EditPhotos } from "./components/EditPhotos";
import { Email } from "./components/sendEmail";
import { ChangePassword } from "./components/changePassword";
import "./App.css";

const App = () => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    const [authCheckCompleted, setAuthCheckCompleted] = useState(false);

    useEffect(() => {
        const fetchUser = () => {
            fetch('http://localhost:5000/api/users/', {
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
                        setUser("");
                    }
                    setAuthCheckCompleted(true);
                })
                .catch((err) => {
                    console.log(err);
                })
        };
        fetchUser();
    }, [logged]);

    if (!logged) {
        return (
            <Router>
                    {authCheckCompleted && (
                        <Routes>
                            <Route path="/" element={<Login userLogged={setLogged} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/sendEmail" element={<Email />} />
                            <Route path="/changePassword/:token" element={<ChangePassword />} />
                            <Route path="/series" element={<Login userLogged={setLogged} />} />
                            <Route path="/series/books/:idbookseries" element={<Login userLogged={setLogged} />} />
                            <Route path="/series/books/book/:idbook" element={<Login userLogged={setLogged} />} />
                            <Route path="/userPage" element={<Login userLogged={setLogged} />} />
                            <Route path="/Addbook" element={<Login userLogged={setLogged} />} />
                            <Route path="/Addseries" element={<Login userLogged={setLogged} />} />
                            <Route path="/update/:idbookshelf" element={<Login userLogged={setLogged} />} />
                            <Route path="/EditPhotos/:idbookshelf" element={<Login userLogged={setLogged} />} />
                        </Routes>
                    )}
            </Router>
        )
    }

    return (

        <Router>
                <div className="header">
                    <div className="blur">
                        <h1 className="header-text">Group B Book Archive</h1>
                    </div>
                </div>
                <NavBar user={user} userLogged={setLogged} />
                {authCheckCompleted && (
                    <Routes>
                        <Route path="/" element={<Logged user={user} islogged={logged} />} />
                        <Route path="/series" element={<SeriesBrowser user={user} />} />
                        <Route path="/series/books/:idbookseries" element={<SeriesInfo user={user} />} />
                        <Route path="/series/books/book/:idbook" element={<BookInfo user={user} />} />
                        <Route path="/userPage" element={<UserPage user={user} />} />
                        <Route path="/Addbook" element={<Addbook user={user} />} />
                        <Route path="/Addseries" element={<Addseries user={user} />} />
                        <Route path="/update/:idbookshelf" element={<Update user={user} />} />
                        <Route path="/EditPhotos/:idbookshelf" element={<EditPhotos user={user} />} />
                    </Routes>
                )}
        </Router>
    )
}
export default App