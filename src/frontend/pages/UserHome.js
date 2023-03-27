import React, { useState, useEffect } from "react";

import "../App.css";


const Logged = (props) => {

    const { user } = props;
    const [shelf, setShelf] = useState([]);
    const [msg, setMsg] = useState("");


    useEffect(() => {
        const fetchBooks = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf/" + user.iduser);
            if (response.ok) {
                let c = await response.json();
                setShelf(c);
            }
            else {
                setMsg("Welcome new user");
            }
        }
        fetchBooks();
    }, []);

    return (
        <div className="App">
            <h1>Welcome</h1>
            <p>{msg} {user.username}</p>
           

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
    )
}

export { Logged }