import React, { useState, useEffect } from "react";
import "../App.css";
import { userHomeInfo } from "../data/data";

const Logged = (props) => {

    const { user, islogged } = props;
    console.log("islogged", islogged);

    const [shelf, setShelf] = useState([]);

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
                
            </div>
        </div>
    )
}

export { Logged }