import React, { useState, useEffect } from "react";
import "../App.css";

const Logged = () => {

    const [shelf, setShelf] = useState([]);
    const [msg, setMsg] = useState("");
    const [bookshelfExists, setBookshelfExists] = useState(false);
    const usersId = localStorage.getItem("iduser");
    const userInfo = localStorage.getItem("username");

    useEffect(() => {
        const fetchBooks = async () => {

            let response = await fetch("http://localhost:5000/api/bookshelf/" + usersId);
            if (response.ok) {
                let c = await response.json();
                setShelf(c);
                setBookshelfExists(true);
            }
            else {
                setMsg("You don't have a bookshelf yet");
                setBookshelfExists(false);
            }
        }
        fetchBooks();
    }, [usersId]);

    return (
        <div>
            <div className="App">
                <h1>Welcome, {userInfo}</h1>

                {bookshelfExists ? <table>
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
                </table> : <p>{msg}</p>}
            </div>
        </div>
    )
}

export { Logged }