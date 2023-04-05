import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const UserPage = (props) => {
    const [bookcopy, setBookcopy] = useState([]);
    const { user } = props;

    useEffect(() => {
        const fetchBooks = async () => {
            let response = await fetch(
                "http://localhost:5000/api/bookcopy/" + user.iduser
            );
            if (response.ok) {
                let c = await response.json();
                setBookcopy(c);
            }
        };
        fetchBooks();
    }, [user.iduser]);

    // Format date in localized string format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    return (
        <div className="user-library">
            <h1 id="h1user"> User Library </h1>
            <div className="user-page">
                <div className="book-grid">
                    {bookcopy.map((book) => (
                        <div className="book" key={book.idbookcopy}>
                            <img src={`path/to/photos/${book.idbookcopy}.jpg`} alt="" />
                            <h2>Bookname: {book.bookname}</h2>
                            <h3>Description: {book.description}</h3>
                            <h4>Publicationyear: {book.publicationyear}</h4>
                            <h5>Condition: {book.condition}</h5>
                            <p>Purchaseprice: {book.purchaseprice}</p>
                            <p>Purchasedate: {formatDate(book.purchasedate)}</p>
                            <p>Solddate: {formatDate(book.solddate)}</p>
                            <p>Soldprice: {book.soldprice}</p>
                            <button className="delete">Delete</button>
                            <button className="update"><Link to={`/update/${book.idbookcopy}`}>Update</Link></button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="user-page-btn" style={{ textAlign: "center" }}>
                <Link to="/addBook">
                    <button className="add-user-btn">
                        Add a new book to your library
                    </button>
                </Link>
                <Link to="/addSeries">
                    <button className="add-user-btn">
                        Add a new custom series
                    </button>
                </Link>
            </div>
        </div>
    );
};
export { UserPage };