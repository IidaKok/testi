import React, {useState} from "react";
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

    return (
        <Router>
            {user ? <NavBar/> : null}
            <Routes>
                <Route path="/" element={
                user ? <Logged user={user}/> : <Login  saveUser={setUser}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/series" element={<SeriesBrowser user={user} />} />
                <Route path="/series/books/:idbookseries" element={<SeriesInfo user={user} />} />
                <Route path="/series/books/book/:idbook" element={<BookInfo user={user} />} />
                <Route path="/userPage" element={<UserPage user={user}/>} />
                <Route path="/Addbook" element={<Addbook user={user}/>} />
                <Route path="/Addseries" element={<Addseries />} />
                <Route path="/update/:idbookshelf" element={<Update />}/>
            </Routes>
        </Router>
    )
}
export default App