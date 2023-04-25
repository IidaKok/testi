import React, { useState, useEffect } from "react";
import "../App.css";
import "../styles/Loginstyle.css";
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
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className="div">
                <h1>Welcome</h1>
                <div className="home-text">
                    {userHomeInfo.map((text, index) => (<p key={index}>{text}</p>))}

                </div>
            </div>
        </div>

    )
}

export { Logged }