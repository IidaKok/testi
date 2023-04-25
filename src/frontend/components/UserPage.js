import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

const UserPage = (props) => {
    const [bookcopy, setBookcopy] = useState([]);
    const [bookPhotos, setBookPhotos] = useState({});
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

    useEffect(() => {
        const fetchBookImages = async () => {
            if (bookcopy.length > 0) {
                let bookIds = bookcopy.map((book) => book.idbookcopy);
                let response = await fetch(
                    "http://localhost:5000/api/photo?bookIds=" + bookIds.join(",")
                );
                if (response.ok) {
                    let photos = await response.json();
                    let photoUrls = {};
                    for (let photo of photos) {
                        // Remove any existing https: prefix
                        let photoname = photo.photoname ? photo.photoname.replace(/^https?:\/\//i, "") : null;
                        if (!photoUrls[photo.idbookcopy]) {
                            photoUrls[photo.idbookcopy] = [];
                        }
                        photoUrls[photo.idbookcopy].push(photoname);
                    }
                    setBookPhotos(photoUrls);
                }
            }
        };

        fetchBookImages();
    }, [bookcopy]);

    // Format date in localized string format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    const handleDelete = async (idbookcopy) => {
        try {
            let response = await fetch("http://localhost:5000/api/bookcopy/" + idbookcopy, {
                method: "DELETE"
            });
            if (response.ok) {
                let data = await response.json();
                console.log(data.message);
                // remove the deleted bookcopy from the bookcopy state array
                setBookcopy(bookcopy.filter((book) => book.idbookcopy !== idbookcopy));
                // remove the deleted bookcopy's photo URL from the bookPhotos state object
                let updatedBookPhotos = { ...bookPhotos };
                delete updatedBookPhotos[idbookcopy];
                setBookPhotos(updatedBookPhotos);
            } else {
                throw new Error("Error deleting bookcopy");
            }
        }
        catch (err) {
            console.error(err);
        }
        // check if a photo exists for the given idbookcopy before making the API call to delete the photo
        if (bookPhotos[idbookcopy]) {
            try {
                let response = await fetch("http://localhost:5000/api/photo/" + idbookcopy, {
                    method: "DELETE"
                });
                if (response.ok) {
                    let data = await response.json();
                    console.log(data.message);
                    // remove the deleted bookcopy's photo URL from the bookPhotos state object
                    let updatedBookPhotos = { ...bookPhotos };
                    delete updatedBookPhotos[idbookcopy];
                    setBookPhotos(updatedBookPhotos);
                } else {
                    throw new Error("Error deleting photo");
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className="user-library">
                <div className="user-page-btn" style={{ textAlign: "center" }}>
                    <Link to="/addBook">
                        <button className="add-user-btn">
                            Add a new private book to your library
                        </button>
                    </Link>
                    <Link to="/addSeries">
                        <button className="add-user-btn">
                            Add a new custom public series
                        </button>
                    </Link>
                </div>
                <div className="user-page">
                    <div className="book-grid">
                        {bookcopy.map((book) => (
                            <div className="book" key={book.idbookcopy}>
                                <h2>{book.bookname}</h2>
                                {bookPhotos[book.idbookcopy] ? (
                                    <div className="book-images">
                                        {bookPhotos[book.idbookcopy] && bookPhotos[book.idbookcopy][0] ? (
                                            <img
                                                src={`https://${bookPhotos[book.idbookcopy][0]}`}
                                                alt=""
                                                className="book-image"
                                            />
                                        ) : (
                                            <img alt="" className="book-image no-image" />
                                        )}
                                    </div>
                                ) : (
                                    <img alt="" className="book-image no-image" />
                                )}
                                <h4>Publication year: {book.publicationyear}</h4>
                                <h3>{book.description}</h3>
                                <p>Edition: {book.edition}</p>
                                <p>Condition: {book.condition}</p>
                                <p>Purchase date: {book.purchasedate ? formatDate(book.purchasedate) : "Not purchased"}</p>
                                <p>Purchase price: {book.purchaseprice ? book.purchaseprice + '$' : '0$'}</p>
                                <p>Sold date: {book.solddate ? formatDate(book.solddate) : 'Not sold'}</p>
                                <p>Sold price: {book.soldprice ? book.soldprice + '$' : '0$'}</p>
                                <button className="update"><Link to={`/update/${book.idbookcopy}`}>Update Info</Link></button>
                                <button className="edit"><Link to={`/Editphotos/${book.idbookcopy}`}>Edit Photos</Link></button>
                                <button className="delete" onClick={() => handleDelete(book.idbookcopy)}>Delete Book</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

};
export { UserPage };