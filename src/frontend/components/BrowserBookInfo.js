import { useState, useEffect } from 'react';
import { NavLink, useParams } from "react-router-dom";
import "../App.css";

import { BrowserEditBook } from './BrowserEditBook';
import { BrowserAddPic } from './BrowserAddPic';
import { BrowserEditPic } from './BrowserEditPic';
import { AddBookModal } from './BrowserAddBookCopy';

export const BookInfo = (props) => {
    const [oneBook, setOneBook] = useState({});
    const params = useParams();
    const { idbook } = params;

    const [allBooks, setAllBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(null);
    const [fCoverImage, setFCoverImage] = useState(null);
    const [bCoverImage, setBCoverImage] = useState(null);
    const [front, setFront] = useState();
    const [back, setBack] = useState();

    const [imageUpdate, setImageUpdate] = useState(false);
    const [bookPhotos, setBookPhotos] = useState([]);
    const [bookCopies, setBookCopies] = useState([]);
    const user = props.user;
    const [bookShelfId, setBookShelfId] = useState();

    const [addClicked, setAddClicked] = useState(false);
    const [bookToDelete, setBookToDelete] = useState(null);
    const [quickAddBook, setQuickAddBook] = useState({});

    const [modalOpen, setModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [addPicture, setAddPicture] = useState(false);
    const [editPicture, setEditPicture] = useState(false);
    const [coverNro, setCoverNro] = useState(0);

    const [allUserSeries, setAllUserSeries] = useState();
    const [ownUserSeries, setOwnUserSeries] = useState();

    const compareSeriesUserSeries = () => {
        console.log("compareSeries allUserSeries: ", allUserSeries);
        console.log("compareSeries ownUserSeries: ", ownUserSeries);

        let sameser
        if (Array.isArray(allUserSeries)) {
            sameser = allUserSeries.find((s) => s.idbookseries == oneBook.idbookseries);
        }

        if (sameser) {
            if (sameser.idbookshelf == bookShelfId) return true;
        }
        else return false;

        /*
        let sameser;
        if (Array.isArray(ownUserSeries)) {
            sameser = ownUserSeries.find((s) => s.idbookseries == oneBook.idbookseries);
            console.log("compareSeries sameser: " + sameser.idbookseries + " compareSeries onebook series id: " + oneBook.idbookseries);
        };

        if (sameser) {
            console.log("before check compareSeries sameser: " + sameser.idbookseries + " compareSeries onebook series id: " + oneBook.idbookseries);

            let foundSer = parseInt(sameser.idbookseries);
            let thisSer = parseInt(oneBook.idbookseries);

            console.log("thisSer: " + thisSer + " foundSer: " + foundSer);

            if (foundSer === thisSer) {
                console.log("is owned series");
                return true;
            } else return false;

        }
        */
    };

    useEffect(() => {
        const fetchBook = async () => {
            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            setAllBooks(books);
            let findBook = books.find((b) => b.idbook == idbook);
            setOneBook(findBook);
            setQuickAddBook({
                id: findBook.idbook,
                edition: null,
                purchaseprice: null,
                purchasedate: null,
                condition: null,
                solddate: null,
                soldprice: null,
            });
            console.log(quickAddBook);
        };
        const fetchBookImages = async () => {
            let response = await fetch("http://localhost:5000/api/artwork");
            let allArtwork = await response.json();
            console.log("fetchBookImages allArtwork: ", allArtwork);

            let findArtwork = allArtwork.filter((a) => a.idbook == idbook);
            console.log("fetchBookImages findArtwork: ", findArtwork);

            let f = findArtwork.find((a) => a.pagenumber == 1);
            let b = findArtwork.find((a) => a.pagenumber == 2);

            setFront(f);
            setBack(b);
            console.log("f: "  + " b: " + back.idpicture);
        };
        const fetchBookPhotos = async () => {
            let response = await fetch("http://localhost:5000/api/photo");
            let allPhotos = await response.json();

            setBookPhotos(allPhotos);
            console.log("fetchBookPhotos bookPhotos: ", bookPhotos);
        };

        fetchBookPhotos();
        fetchBookImages();
        fetchBook();
    }, [idbook, openEdit, imageUpdate]);

    useEffect(() => {
        const fetchBookPicture = async () => {
            let response = await fetch("http://localhost:5000/api/picture/");
            let picture = await response.json();

            if (front) {
                let idFront = front.idpicture;
                let findFront = picture.find((p) => p.idpicture == idFront);
                setFCoverImage(findFront);
            }

            if (back) {
                let idBack = back.idpicture;
                let findBack = picture.find((p) => p.idpicture == idBack);
                setBCoverImage(findBack);
            }
        };

        if (front != null || back != null) fetchBookPicture(); // thisArtwork
    }, [imageUpdate, front, back])

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        const fetchBookshelf = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf");
            let bookshelves = await response.json();
            let userBookshelf = bookshelves.find((b) => b.iduser == user.iduser);
            setBookshelf(userBookshelf);
            setBookShelfId(userBookshelf.idbookshelf);
        };

        const fetchUserseries = async () => {
            let response = await fetch("http://localhost:5000/api/userseries");
            let userseries = await response.json();
            console.log("fetchuserseries userseries: ", userseries);
            setAllUserSeries(userseries);
            let findUserSeries = userseries.filter((u) => u.idbookshelf === bookShelfId);
            setOwnUserSeries(findUserSeries);
            setDataLoaded(true);
        };

        if (bookshelf == null) fetchBookshelf();
        fetchUserseries();
    }, [bookshelf, user.iduser, oneBook, allBooks, openEdit]);

    const hasSeriesInBookShelf = dataLoaded ? compareSeriesUserSeries() : false;

    const insertBook = async (book) => {
        let findBook = allBooks.find((b) => b.idbook == book.id);
        if (bookshelf !== null) {
            const r = await fetch("http://localhost:5000/api/bookcopy", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    bookname: findBook.bookname,
                    edition: book.edition, // default arvo
                    publicationyear: findBook.publicationyear,
                    idbook: findBook.idbook,
                    purchaseprice: book.purchaseprice, // default arvo
                    purchasedate: book.purchasedate, // default arvo
                    condition: book.condition, // default arvo
                    description: findBook.description,
                    solddate: book.solddate, // default arvo
                    soldprice: book.soldprice, // default arvo
                    idbookseries: findBook.idbookseries,
                    idbookshelf: bookshelf.idbookshelf,
                }),
            });
            console.log("INSERT:", r);
        }
        setAddClicked(false);
    };

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    const openEditModal = () => {
        console.log("Book to edit (openEditModal): ", oneBook);
        setOpenEdit(true);
    }
    const closeEditModal = () => {
        setOpenEdit(false)
    }

    const openPictureModal = (cover) => {
        if (cover == 1) setCoverNro(1);
        if (cover == 2) setCoverNro(2);
        setAddPicture(true);
    }
    const closePictureModal = () => {
        setAddPicture(false);
    }

    const openEditPicModal = () => {
        setEditPicture(true);
    }
    const closeEditPicModal = () => {
        setEditPicture(false);
    }

    const updateImage = () => {
        setImageUpdate(!imageUpdate);
    }



    const deleteBook = async (bookId) => {
        if (fCoverImage) {
            const resp = await fetch(`http://localhost:5000/api/picture/${fCoverImage.idpicture}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: "",
            })
            console.log("DELETE:", resp);
        };
        if (bCoverImage) {
            const resp = await fetch(`http://localhost:5000/api/picture/${bCoverImage.idpicture}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: "",
            })
            console.log("DELETE:", resp);
        };

        const deletePhotos = async (bCopy) => {
            const resp = await fetch(`http://localhost:5000/api/photo/${bCopy.idbookcopy}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: "",
            });
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

    return (
        <div>
            <NavLink to={"/series/books/" + oneBook.idbookseries} style={{ textDecoration: "none", color: "grey" }}>← Back to books</NavLink>
            <h3>{oneBook.bookname}</h3>
            {fCoverImage ? <img src={`${fCoverImage.filename}`} /> : <img src="https://i.imgur.com/Qr08eFc.png" style={{ width: "250px", height: "250px" }} />}
            {bCoverImage ? <img src={`${bCoverImage.filename}`} /> : <img src="https://i.imgur.com/Qr08eFc.png" style={{ width: "250px", height: "250px" }} />}
            {dataLoaded && hasSeriesInBookShelf &&
                <>
                    {fCoverImage ? <p><button onClick={openEditPicModal}>Change the cover picture</button></p> : <p><button onClick={() => { openPictureModal(1) }}>Add a cover picture</button></p>}
                    {bCoverImage ? <p><button onClick={openEditPicModal}>Change the back cover picture</button></p> : <p><button onClick={() => { openPictureModal(2) }}>Add a back cover picture</button></p>}
                    {addPicture && <BrowserAddPic closePictureModal={closePictureModal} bookid={idbook} setImageUpdate={updateImage} cover={coverNro} />}
                    {editPicture && <BrowserEditPic closeEditPicModal={closeEditPicModal} picToEdit={fCoverImage} setImageUpdate={updateImage} />}
                </>
            }

            <p>{oneBook.publicationyear}</p>
            <p>Author: {oneBook.writer}</p>
            <p>Description: {oneBook.description}</p>
            <button onClick={(e) => { e.preventDefault(); setAddClicked(true) }}>Quick add</button>
            {addClicked && <button onClick={() => insertBook(quickAddBook)}>Confirm?</button>}

            <button onClick={openModal}>Add with information</button>
            {modalOpen && <AddBookModal closeModal={closeModal} insertBook={insertBook} id={oneBook.idbook} />}

            {dataLoaded && hasSeriesInBookShelf &&
                <>
                    <p>Edit information about this book: <button onClick={openEditModal}>Edit</button></p>
                    {openEdit && <BrowserEditBook closeEditModal={closeEditModal} bookToEdit={oneBook} />}
                    <p>Delete book:
                        {bookToDelete ?
                            <button onClick={deleteBook(oneBook.idbook)}>Confirm?</button> :
                            <button onClick={() => setBookToDelete(oneBook.idbook)}>Delete</button>
                        }
                    </p>
                </>
            }
        </div>
    )
}