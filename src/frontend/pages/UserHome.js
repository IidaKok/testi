import React, { useState, useEffect } from "react";
import "../App.css";
import { userHomeInfo } from "../data/data";

const Logged = (props) => {

    const { user, islogged } = props;
    console.log("islogged", islogged);

    const [shelf, setShelf] = useState([]);


    /* useEffect(() => {
         
         const fetchBooks = () => {
                fetch("http://localhost:5000/api/users/createBookshelf/", {
                     method: "POST",
                     headers: {
                         "Content-type": "application/json",
                     },
                     body: JSON.stringify({
                         username: user.username,
                         iduser: user.iduser
                     }),
                 })
                     .then(response => {
                         if (response.ok) {
                             response.json()
                             .then(c => {
                                 setShelf(c)}
                                 )
                             
                         }
                     })
                     .catch(error => console.log(error))   
         }
         fetchBooks();
         
     }, []);*/
    useEffect(() => {
        const fetchBooks = async () => {

            let response = await fetch("http://localhost:5000/api/bookshelf/" + user.iduser);
            if (response.ok) {
                let c = await response.json();
                setShelf(c);
            }
        }
        fetchBooks();
    }, [user.iduser]);

    return (
        <div>
            <div className="div">
                <h1>Welcome, {user.username}</h1>

                <p>{userHomeInfo}</p>
                <table>
                    <thead>
                        <tr>
                            <th>iduser</th>
                            <th>idbookshelf</th>
                            <th>owner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{shelf.iduser}</td>
                            <td>{shelf.idbookshelf}</td>
                            <td>{shelf.owner}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { Logged }