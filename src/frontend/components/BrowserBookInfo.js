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

    const compareSeriesUserSeries = () => {
        let sameser
        if (Array.isArray(allUserSeries)) {
            sameser = allUserSeries.find((s) => s.idbookseries == oneBook.idbookseries);
        }
        if (sameser) {
            if (sameser.idbookshelf == bookShelfId) return true;
        }
        else return false;
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
        };
        const fetchBookImages = async () => {
            let response = await fetch("http://localhost:5000/api/artwork");
            let allArtwork = await response.json();
            let findArtwork = allArtwork.filter((a) => a.idbook == idbook);
            let f = findArtwork.find((a) => a.pagenumber == 0);
            let b = findArtwork.find((a) => a.pagenumber == 99999);
            setFront(f);
            setBack(b);
        };
        const fetchBookPhotos = async () => {
            let response = await fetch("http://localhost:5000/api/photo");
            let allPhotos = await response.json();
            setBookPhotos(allPhotos);
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

        if (front != null || back != null) fetchBookPicture();
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
            setAllUserSeries(userseries);
            setDataLoaded(true);
        };
        if (bookshelf == null) fetchBookshelf();
        fetchUserseries();
    }, [bookshelf, user.iduser, oneBook, allBooks, openEdit]);

    const hasSeriesInBookShelf = dataLoaded ? compareSeriesUserSeries() : false;

    const insertBook = async (book) => {

        const addCoverPhotos = async (idBCopy) => { // is called after bookcopy is inserted into user bookshelf. idBCopy is the id of the newly created bookcopy 
            if (bookshelf !== null && fCoverImage !== null) {
                const r = await fetch("http://localhost:5000/api/photo/post/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        photoname: fCoverImage.filename,
                        idbookcopy: idBCopy,
                        pagenumber: 0,
                    }),
                });
                console.log("INSERT FRONT PHOTO:", r);
            };
            if (bookshelf !== null && bCoverImage !== null) {
                const r = await fetch("http://localhost:5000/api/photo/post/", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        photoname: bCoverImage.filename,
                        idbookcopy: idBCopy,
                        pagenumber: 99999,
                    }),
                });
                console.log("INSERT BACK PHOTO:", r);
            };
        };

        let findBook = allBooks.find((b) => b.idbook == book.id);
        if (bookshelf !== null) {
            const response = await fetch("http://localhost:5000/api/bookcopy", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    bookname: findBook.bookname,
                    edition: book.edition,
                    publicationyear: findBook.publicationyear,
                    idbook: findBook.idbook,
                    purchaseprice: book.purchaseprice,
                    purchasedate: book.purchasedate,
                    condition: book.condition,
                    description: findBook.description,
                    solddate: book.solddate,
                    soldprice: book.soldprice,
                    idbookseries: findBook.idbookseries,
                    idbookshelf: bookshelf.idbookshelf,
                }),
            });
            console.log("INSERT:", response);
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }
            const data = await response.json();
            console.log("Series created: ", data.id);
            if (data.id !== null) addCoverPhotos(data.id);
        };
        setAddClicked(false);
    };

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }
    const openEditModal = () => {
        setOpenEdit(true);
    }
    const closeEditModal = () => {
        setOpenEdit(false)
    }
    const openPictureModal = (cover) => {
        if (cover == 0) setCoverNro(0);
        if (cover == 99999) setCoverNro(99999);
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
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className='flex-base-bookinfo'>
                <div className='pic-box'>
                    <NavLink to={"/series/books/" + oneBook.idbookseries} style={{ textDecoration: "none", color: "grey" }}>← Back to books</NavLink>
                    <div className='pic-box-pictures'>
                        {fCoverImage ? <img src={`${fCoverImage.filename}`} /> : <img src="https://i.imgur.com/Qr08eFc.png" style={{ width: "250px", height: "250px" }} />}
                        {bCoverImage ? <img src={`${bCoverImage.filename}`} /> : <img src="https://i.imgur.com/Qr08eFc.png" style={{ width: "250px", height: "250px" }} />}
                    </div>
                    {dataLoaded && hasSeriesInBookShelf &&
                        <>
                            {fCoverImage ? <p><button onClick={openEditPicModal}>Change the cover picture</button></p> : <p><button onClick={() => { openPictureModal(0) }}>Add a cover picture</button></p>}
                            {bCoverImage ? <p><button onClick={openEditPicModal}>Change the back cover picture</button></p> : <p><button onClick={() => { openPictureModal(99999) }}>Add a back cover picture</button></p>}
                            {addPicture && <BrowserAddPic closePictureModal={closePictureModal} bookid={idbook} setImageUpdate={updateImage} cover={coverNro} />}
                            {editPicture && <BrowserEditPic closeEditPicModal={closeEditPicModal} picToEdit={fCoverImage} setImageUpdate={updateImage} />}
                        </>
                    }
                </div>
                <div className='data-box'>
                    <h3>{oneBook.bookname}</h3>
                    <p><b>Publication year: </b>{oneBook.publicationyear}</p>
                    <p><b>Author: </b>{oneBook.writer}</p>
                    <p><b>Description: </b>{oneBook.description}</p>
                    {addClicked ?
                        <button className='add-books-btn' onClick={() => insertBook(quickAddBook)}>Confirm?</button> :
                        <button className='add-books-btn' onClick={(e) => { e.preventDefault(); setAddClicked(true) }}>Quick add</button>
                    }

                    <button className='add-books-btn' onClick={openModal}>Add with information</button>
                    {modalOpen && <AddBookModal closeModal={closeModal} insertBook={insertBook} id={oneBook.idbook} />}

                    {dataLoaded && hasSeriesInBookShelf &&
                        <>
                            <p>Edit information about this book: <button className='update' onClick={openEditModal}>Edit</button></p>
                            {openEdit && <BrowserEditBook closeEditModal={closeEditModal} bookToEdit={oneBook} />}
                            <p>Delete book:
                                {bookToDelete ?
                                    <button className='delete' onClick={deleteBook(oneBook.idbook)}>Confirm?</button> :
                                    <button className='delete' onClick={() => setBookToDelete(oneBook.idbook)}>Delete</button>
                                }
                            </p>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}