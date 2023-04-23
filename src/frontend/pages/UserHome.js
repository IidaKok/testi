import React, { useState, useEffect } from "react";
import "../App.css";

const Logged = (props) => {

    const { user } = props;

    const [shelf, setShelf] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
               await fetch("http://localhost:5000/api/users/createBookshelf/", {
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
                    });
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchBooks();
    }, [user]);

    return (
        <div>
            <div className="App">
                <h1>Welcome, {user.username}</h1>

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