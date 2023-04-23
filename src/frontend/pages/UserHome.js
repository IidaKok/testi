import React, { useState, useEffect } from "react";
import "../App.css";
import { userHomeInfo } from "../data/data";

const Logged = (props) => {

    const { user, islogged } = props;
    console.log("islogged", islogged);

    const [shelf, setShelf] = useState([]);


    useEffect(() => {
        
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
        
    }, []);

    return (
        <div>
            <div className="div">
                <h1>Welcome, {user.username}</h1>

                 <p>{userHomeInfo}</p>
            </div>
        </div>
    )
}

export { Logged }