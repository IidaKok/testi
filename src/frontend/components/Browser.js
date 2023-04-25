import { useState, useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import "../App.css";

import { BrowserAddSeries } from './BrowserAddSeries';
import { BrowserEditSeries } from './BrowserEditSeries';

export const SeriesBrowser = (props) => {
    const [series, setSeries] = useState([]);
    const [bookToAdd, setBookToAdd] = useState();

    const [allBooks, setAllBooks] = useState([]);
    const user = props.user; // used to determine in which bookshelf to add book copies
    const [bookshelf, setBookshelf] = useState(null);
    const [bookShelfId, setBookShelfId] = useState();
    const [artwork, setArtwork] = useState();
    const [pictures, setPictures] = useState();
    const [bookImage, setBookImage] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [seriesToEdit, setSeriesToEdit] = useState({});
    const [seriesToDelete, setSeriesToDelete] = useState();
    const [seriesToAdd, setSeriesToAdd] = useState();
    const [booksToDelete, setBooksToDelete] = useState([]);

    const [allUserSeries, setAllUserSeries] = useState();
    const [ownUserSeries, setOwnUserSeries] = useState();

    const openAddModal = () => {
        setModalOpen(true);
    }
    const closeAddModal = () => {
        setModalOpen(false);
    }

    const openEditModal = (series) => {
        setSeriesToEdit(series);
        setOpenEdit(true);
    }
    const closeEditModal = () => {
        setOpenEdit(false)
    }

    // may change later on
    const tblCell = {
        border: "1px solid black",
        textAlign: "left",
        borderRadius: "4px"
    };
    const tblCellSer = {
        border: "1px solid black",
        textAlign: "left",
        borderRadius: "4px",
        width: "400px"
    };

    const noUnderLine = {
        textDecoration: "none"
    };

    // fetches the books and series from the database
    useEffect(() => {
        const fetchSeries = async () => {
            let response = await fetch("http://localhost:5000/api/bookseries");
            let c = await response.json();
            setSeries(c);
        };
        const fetchBooks = async () => {
            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            setAllBooks(books);
        };
        const fetchBookImages = async () => {
            let response = await fetch("http://localhost:5000/api/artwork");
            let allArtwork = await response.json();
            setArtwork(allArtwork);
        };

        fetchBookImages();
        fetchBooks();
        fetchSeries();

    }, [modalOpen, openEdit, seriesToDelete]);

    useEffect(() => {
        const fetchBookPicture = async () => {
            let response = await fetch("http://localhost:5000/api/picture/");
            let picture = await response.json();
            setPictures(picture);
        };
        fetchBookPicture();
    }, [artwork]);

    useEffect(() => {
        const fetchBookshelf = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf");
            let bookshelfs = await response.json();
            let userBookshelf = bookshelfs.find((b) => b.iduser == user.iduser);
            setBookshelf(userBookshelf);
            setBookShelfId(userBookshelf.idbookshelf);
        }
        if (bookshelf == null || bookShelfId == null) fetchBookshelf();

        const fetchUserseries = async () => {
            let response = await fetch("http://localhost:5000/api/userseries");
            let userseries = await response.json();
            setAllUserSeries(userseries);
            let findUserSeries = userseries.filter((u) => u.idbookshelf === bookShelfId);
            setOwnUserSeries(findUserSeries);
        }
        fetchUserseries();
    }, [bookshelf, user.iduser, series]);

    useEffect(() => {
        const insertBooksToBookshelf = async () => {
            if (bookToAdd !== null && bookshelf !== null) {
                const filteredBooks = allBooks.filter(b => b.idbookseries === bookToAdd);
                const bookCopyPromises = filteredBooks.map(book => {
                    return fetch("http://localhost:5000/api/bookcopy", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify({
                            bookname: book.bookname,
                            edition: null, // default arvo
                            publicationyear: book.publicationyear,
                            idbook: book.idbook,
                            purchaseprice: null, // default arvo
                            purchasedate: null, // default arvo
                            condition: null, // default arvo
                            description: book.description,
                            solddate: null, // default arvo
                            soldprice: null, // default arvo
                            idbookseries: book.idbookseries,
                            idbookshelf: bookshelf.idbookshelf,
                        }),
                    });
                });

                Promise.all(bookCopyPromises)
                    .then(responses => {
                        console.log("Inserted book copies: ", responses);
                        setBookToAdd(null);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                setSeriesToAdd(null);
            }
        };

        insertBooksToBookshelf();
    }, [bookToAdd, allBooks, bookshelf]);

    const deleteSeries = async (seriesId) => { // length
        let findBooksToDelete = allBooks.find((b) => b.idbookseries == seriesId);
        setBooksToDelete(findBooksToDelete);

        const deleteBooks = async (book) => {
            const deletePictures = async (art) => {
                const resp = await fetch(`http://localhost:5000/api/picture/${art.idpicture}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: "",
                });
                setBookImage([]);
                console.log("DELETE:", resp);
            };

            if (artwork.length >= 1) {
                let findArtwork = artwork.find((a) => a.idbook == book.idbook);
                setBookImage(findArtwork);
                if (Array.isArray(bookImage)) {
                    bookImage.forEach(deletePictures);
                };
            };

            const resbc = await fetch(`http://localhost:5000/api/bookcopy/${book.idbook}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: "",
            });
            console.log("DELETE:", resbc);

            const resb = await fetch(`http://localhost:5000/api/book/${book.idbook}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: "",
            });
            console.log("DELETE:", resb);
        };

        if (booksToDelete.length >= 1) {
            if (Array.isArray(booksToDelete)) {
                booksToDelete.forEach(deleteBooks);
            };
        };

        const resbs = await fetch(`http://localhost:5000/api/bookseries/${seriesId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: "",
        });
        console.log("DELETE:", resbs);

        setBooksToDelete([]);
        setSeriesToDelete(null);
    };


    const compareSeriesUserSeries = (ser) => {
        // returns a boolean value to determine whether the delete and edit buttons get rendered or not
        // if the user logged in has created the series, they should be able to edit and delete it

        let sameser
        if (Array.isArray(allUserSeries)) {
            sameser = allUserSeries.find((s) => s.idbookseries == ser.idbookseries);
        }

        if (sameser) {
            if (sameser.idbookshelf == bookShelfId) return true;
        }
        else return false;
    };


    return (
        <div className='animate__animated animate__fadeIn animate__slow'>
        <div className='flex-base'>
            <div className='browser-container-table'>
                <table className='browser-table'>
                    <thead>
                        <tr>
                            <th>Series</th>
                            <th>Publishers</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {   // all the book series get rendered in a table element here
                            useMemo(() => series.map((s, index) => {
                                const hasSeriesInBookshelf = compareSeriesUserSeries(s);
                                return (
                                    <tr key={index} >
                                        <td>
                                            {seriesToAdd === s.idbookseries ?
                                                <button className='add-books-btn' onClick={() => setBookToAdd(s.idbookseries)}>Confirm?</button> :
                                                <button className='add-books-btn' onClick={() => setSeriesToAdd(s.idbookseries)}>+</button>
                                            }
                                            <NavLink to={'/series/books/' + s.idbookseries}>{s.bookseries}</ NavLink>
                                        </td>
                                        <td>{s.publisher}</td>
                                        {hasSeriesInBookshelf ?
                                            <>
                                                <td><button className='update' onClick={() => openEditModal(s)}>Edit</button></td>
                                                <td>
                                                    {seriesToDelete === s.idbookseries ?
                                                        <button className='delete' onClick={() => deleteSeries(s.idbookseries)}>Confirm?</button> :
                                                        <button className='delete' onClick={() => setSeriesToDelete(s.idbookseries)}>Delete</button>
                                                    }
                                                </td>
                                            </> :
                                            <>
                                                <td></td>
                                                <td></td>
                                            </>
                                        }
                                    </tr>
                                )
                            }), [series, compareSeriesUserSeries, allUserSeries])
                        }
                    </tbody>
                </table>
            </div>
            <div className='browser-container-button'>
                <p>Can't find your series? Add it here: </p>
                <button className='add-user-btn' onClick={openAddModal}>Add series</button>
                {modalOpen && <BrowserAddSeries closeAddModal={closeAddModal} idbookshelf={bookShelfId} />}
                {openEdit && <BrowserEditSeries closeEditModal={closeEditModal} seriesToEdit={seriesToEdit} />}
            </div>
        </div>
        </div>
    )
}