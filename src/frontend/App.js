import React, { useState, useEffect } from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import { Logged } from "./pages/UserHome";
import { SeriesBrowser, SeriesInfo, BookInfo } from "./components/Browser";
import { NavBar } from "./components/NavBar";
import { UserPage } from "./components/UserPage";
import { Addbook } from "./components/Addbook";
import { Addseries } from "./components/Addseries";
import { Update } from "./components/Update";
import { EditPhotos } from "./components/EditPhotos";
import { Email } from "./components/sendEmail";
import { ChangePassword } from "./components/changePassword";
import headerPicture from "./header_picture.jpg";

const App = () => {
    const [user, setUser] = useState(null);
    const [logged, setLogged] = useState(false);
    

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
                    })
                    .catch((err) => {
                        console.log(err);
                    })      
        };
        fetchUser();
    }, [logged]);

    return (
        <Router>
            {logged ? <>
            <div className="header">   
                <img src={headerPicture} style={{width:"100%", filter: "blur(2px)"}}/>
                <h1 className="header-text">Group B Book Archive</h1>
            </div>
            <NavBar user={user} userLogged={setLogged} />
            </> : null}
            <Routes>
                <Route path="/" element={
                    logged ? <Logged user={user} islogged={logged} /> : <Login userLogged={setLogged} />} />
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

                <Route path="/sendEmail" element={<Email />} />
                <Route path="/changePassword/:token" element={<ChangePassword />} />
            </Routes>
        </Router>
    )
}
/*<Router>
            {logged ? <NavBar user={user} userLogged={setLogged} /> : null}
            <Routes>
                <Route path="/" element={
                    logged ? <Logged user={user} islogged={logged} /> : <Login userLogged={setLogged} />} />
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

                <Route path="/sendEmail" element={<Email />} />
                <Route path="/changePassword/:token" element={<ChangePassword />} />
            </Routes>
        </Router>*/
export default App