import React, {useState, useEffect} from "react";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
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
          credentials: 'include', // Send cookies with the request
        })
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
          if(data.loggedIn){ 
            //adds user to local storage
          //const storedUser = localStorage.setItem('username', user.username);
          //console.log(storedUser);
          localStorage.setItem('username', data.username);
          localStorage.setItem('loggedIn', true);


            setLogged(true);
            console.log("user.loggedIn:", data.loggedIn);
            setUser(data);
          }
          if(!data.loggedIn){
            localStorage.setItem('loggedIn', false);
            localStorage.setItem('username', null);

            console.log("user.loggedIn:", data.loggedIn);
            setLogged(false);
          }
        })
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);
    return (
        <Router>
            {logged ? <NavBar setLoggedIn={setLogged}/> : null}
            <Routes>
                <Route path="/" element={
                logged ? <Logged user={user}/> : <Login userLogged={setLogged}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/series" element={<SeriesBrowser user={user} />} />
                <Route path="/series/books/:idbookseries" element={<SeriesInfo user={user} />} />
                <Route path="/series/books/book/:idbook" element={<BookInfo user={user} />} />
                <Route path="/userPage" element={<UserPage user={user}/>} />
                <Route path="/Addbook" element={<Addbook user={user}/>} />
                <Route path="/Addseries" element={<Addseries />} />
                <Route path="/update/:idbookshelf" element={<Update user={user}/>}/>
            </Routes>
        </Router>
    )
}
export default App