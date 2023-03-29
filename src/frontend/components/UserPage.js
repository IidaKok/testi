/* väliaikaisesti kommentoitu

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const UserPage = () => {
    const [bookcopy, setBookcopy] = useState([]);

    useEffect(() => {
        const fetchAllUserBooks = async () => {
            let response = await fetch("http://localhost:5000/api/bookcopy/");
            let c = await response.json();
            setBookcopy(c);
        }

        fetchAllUserBooks()
    }, []);

    return (
        <div>
            <h1 id="h1user"> User Library </h1>
            <div className="user-page">
                {bookcopy.map(book => (
                    <div className="inner-user-page" key={book.idbookcopy}>
                        <h2>Bookname: {book.bookname}</h2>
                        <h3>Description: {book.description}</h3>
                        <h4>Publicationyear: {book.publicationyear}</h4>
                        <h5>Condition: {book.condition}</h5>
                        <p>Purchaseprice: {book.purchaseprice}</p>
                        <p>Purchasedate: {book.purchasedate}</p>
                        <p>Solddate: {book.solddate}</p>
                        <p>Soldprice: {book.soldprice}</p>
                        <button className="delete">Delete</button>
                        <button className="update">Update</button>
                    </div>
                    ))}
            </div>
            <div className="user-page-btn" style={{ textAlign: 'center' }}>
            <Link to="/addBook"><button className="add-user-btn">Add a new book to your library</button></Link>
            <Link to="/addSeries"><button className="add-user-btn">Add a new custom series to your library</button></Link>
            </div>
        </div>
    )
}

export { UserPage }

*/