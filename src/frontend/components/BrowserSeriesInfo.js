import { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import "../App.css";

import { BrowserAddBook } from './BrowserAddBook';
import { BrowserEditSeries } from './BrowserEditSeries';

// Komponentti, jossa näytetään yksittäiseen sarjaan kuuluvat kirjat
export const SeriesInfo = (props) => {
    const [bookData, setBookData] = useState([]);
    const params = useParams();
    const { idbookseries } = params;
    const [bookToAdd, setBookToAdd] = useState();
    const [bookToDelete, setBookToDelete] = useState();
    const [thisSeries, setThisSeries] = useState({});

    const [allBooks, setAllBooks] = useState([]);
    const user = props.user;
    const [bookshelf, setBookshelf] = useState(null);
    const [bookShelfId, setBookShelfId] = useState(null);

    const [artwork, setArtwork] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [bookImage, setBookImage] = useState([]);
    const [bookPhotos, setBookPhotos] = useState([]);
    const [bookCopies, setBookCopies] = useState([]);

    const [modalOpen, setModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [allUserSeries, setAllUserSeries] = useState();
    const [ownUserSeries, setOwnUserSeries] = useState();
    const [hasSeriesInBookShelf, setHasSeriesInBookShelf] = useState();

    const openAddModal = () => {
        setModalOpen(true);
    }
    const closeAddModal = () => {
        setModalOpen(false);
    }

    const openEditModal = () => {
        setOpenEdit(true);
    }
    const closeEditModal = () => {
        setOpenEdit(false)
    }

    const compareSeriesUserSeries = () => {
        let sameser
        if (Array.isArray(ownUserSeries)) {
            sameser = allUserSeries.find((s) => s.idbookseries == idbookseries);
        }

        if (sameser) {
            if (sameser.idbookshelf == bookShelfId) return true;
        }
        else return false;
    }

    useEffect(() => {
        const fetchSeries = async () => {
            let response = await fetch("http://localhost:5000/api/bookseries");
            let allSeries = await response.json();
            let [findSeries] = allSeries.filter((s) => s.idbookseries == idbookseries);
            setThisSeries(findSeries || {});
        }
        fetchSeries();
    }, [openEdit])


    useEffect(() => {
        const fetchBooks = async () => {
            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            setAllBooks(books);
            let filteredBooks = books.filter((b) => b.idbookseries == idbookseries);
            setBookData(filteredBooks);
        };
        const fetchBookImages = async () => {
            let response = await fetch("http://localhost:5000/api/artwork");
            let allArtwork = await response.json();
            setArtwork(allArtwork);
        };
        const fetchBookPhotos = async () => {
            let response = await fetch("http://localhost:5000/api/photo");
            let allPhotos = await response.json();
            setBookPhotos(allPhotos);
        };

        fetchBookPhotos();
        fetchBookImages();
        fetchBooks();
    }, [modalOpen, bookToDelete]);

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
        let hasSeries = compareSeriesUserSeries();
        setHasSeriesInBookShelf(hasSeries);
    }, [bookshelf, user.iduser, allBooks, thisSeries]);

    const insertBook = async (bookId) => {
        let findBook = allBooks.find((b) => b.idbook == bookId);
        if (bookshelf !== null) {
            const r = await fetch("http://localhost:5000/api/bookcopy", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    bookname: findBook.bookname,
                    edition: null, // default arvo
                    publicationyear: findBook.publicationyear,
                    idbook: findBook.idbook,
                    purchaseprice: null, // default arvo
                    purchasedate: null, // default arvo
                    condition: null, // default arvo
                    description: findBook.description,
                    solddate: null, // default arvo
                    soldprice: null, // default arvo
                    idbookseries: findBook.idbookseries,
                    idbookshelf: bookshelf.idbookshelf,
                }),
            });
            console.log("INSERT:", r);
        }
        setBookToAdd(null);
    };

    const deleteBook = async (bookId) => {
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
            let findArtwork = artwork.find((a) => a.idbook == bookId);
            setBookImage(findArtwork);
            if (Array.isArray(bookImage)) {
                bookImage.forEach(deletePictures);
            };
        };

        const deletePhotos = async (bCopy) => {
            const resp = await fetch(`http://localhost:5000/api/photo/${bCopy.idbookcopy}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: "",
            });
            setBookImage([]);
            console.log("DELETE:", resp);
        };

        if (bookPhotos.length >= 1) {
            // let findPhotos = bookPhotos.find((p) => p.idbookcopy ==)
            const res = await fetch(`http://localhost:5000/api/bookcopy/`);
            let allBookCopies = await res.json();
            let findBookCopies = allBookCopies.find((b) => b.idbook == bookId);
            setBookCopies(findBookCopies);
            if (Array.isArray(bookCopies)) {
                bookCopies.forEach(deletePhotos);
            };
        };

        const resbc = await fetch(`http://localhost:5000/api/bookcopy/idbook/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: "",
        });
        console.log("DELETE:", resbc);

        const resb = await fetch(`http://localhost:5000/api/book/${bookId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            body: "",
        });
        console.log("DELETE:", resb);

        setBookToDelete(null);
    };


    const renderTableRows = () => {
        let ownSer = compareSeriesUserSeries();
        return bookData.map((b) => (
            <tr key={b.idbook}>
                <td>
                    {bookToAdd === b.idbook ?
                        <button className='add-books-btn' onClick={() => insertBook(b.idbook)}>Confirm?</button> :
                        <button className='add-books-btn' onClick={() => setBookToAdd(b.idbook)}>+</button>
                    }
                    <NavLink to={'/series/books/book/' + b.idbook}>{b.bookname}</ NavLink>
                </td>
                <td>{b.publicationyear}</td>
                {ownSer ?
                    <td>
                        {bookToDelete === b.idbook ?
                            <button className='delete' onClick={() => deleteBook(b.idbook)}>Confirm?</button> :
                            <button className='delete' onClick={() => setBookToDelete(b.idbook)}>Delete</button>
                        }
                    </td> :
                    <td></td>
                }
            </tr>
        ));
    };

    return (
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className='flex-base'>
                <div className='browser-container-info'>
                    <div className='info-box'>
                        <NavLink to="/series">← Back to series</NavLink>
                        <h2>{thisSeries.bookseries}</h2>
                        <p><b>Publisher:</b> {thisSeries.publisher}</p>
                        <p><b>Description:</b> {thisSeries.description}</p>
                        <p><b>Classification:</b> {thisSeries.classification}</p>
                        {hasSeriesInBookShelf &&
                            <>
                                <p>Edit information about the series: <button className='update' onClick={openEditModal}>Edit</button></p>
                                <p>
                                    {openEdit &&
                                        <BrowserEditSeries closeEditModal={closeEditModal} seriesToEdit={thisSeries} />
                                    }
                                </p>
                            </>
                        }
                    </div>
                </div>
                <div className='browser-container-table'>
                    <table className='browser-table'>
                        <thead>
                            <tr style={{ height: "35px", backgroundColor: "lavender" }}>
                                <th>Books</th>
                                <th>Publication year</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderTableRows()}
                        </tbody>
                    </table>
                </div>
                <div className='browser-container-button'>
                    {hasSeriesInBookShelf &&
                        <>
                            <p>Add new books here:</p>
                            <button className='add-user-btn' onClick={openAddModal}>New book</button>
                        </>
                    }
                    {modalOpen && <BrowserAddBook closeAddModal={closeAddModal} seriesid={idbookseries} />}
                </div>
            </div>
        </div>
    )
}