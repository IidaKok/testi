import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

import { BrowserAddSeries } from './BrowserAddSeries';
import { BrowserAddBook } from './BrowserAddBook';
import { BrowserEditSeries } from './BrowserEditSeries';
import { BrowserEditBook } from './BrowserEditBook';
import { BrowserAddPic } from './BrowserAddPic';

export const SeriesBrowser = (props) => {
    const [series, setSeries] = useState([]);
    const [bookToAdd, setBookToAdd] = useState();

    const [allBooks, setAllBooks] = useState([]);
    const user = props.user;
    const [bookshelf, setBookshelf] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [seriesToEdit, setSeriesToEdit] = useState({});

    const openAddModal = () => {
        setModalOpen(true);
    }
    const closeAddModal = () => {
        setModalOpen(false);
    }

    const openEditModal = (series) => {
        setSeriesToEdit(series);
        console.log("Series to edit (openEditModal): ", seriesToEdit);
        setOpenEdit(true);
    }
    const closeEditModal = () => {
        setOpenEdit(false)
    }

    // Voi muuttua paljon vielä.
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

    // poistaa linkkien alleviivaukset
    const noUnderLine = {
        textDecoration: "none"
    };
    
    // haetaan sarjat ja kirjat tietokannasta:
    useEffect( () => {
        const fetchSeries = async () => {
            let response = await fetch("http://localhost:5000/api/bookseries");
            let c = await response.json();
            setSeries(c);
            console.log("series: ", series);
        }
        const fetchBooks = async () => {
            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            setAllBooks(books);       
        }

        fetchBooks();
        fetchSeries();
    }, [modalOpen, openEdit]);

    useEffect(() => {
        const fetchBookshelf = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf");
            let bookshelfs = await response.json();
            let userBookshelf = bookshelfs.find((b) => b.iduser == user.iduser);
            setBookshelf(userBookshelf);
        }
        if (bookshelf == null) fetchBookshelf();
    }, [bookshelf, user.iduser]);

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
            }
        };

        insertBooksToBookshelf();
    }, [bookToAdd, allBooks, bookshelf]);


    return (
        <div>
            <table >
                <thead>
                    <tr style={{height: "35px", backgroundColor: "lavender"}}>
                        <th style={tblCellSer}>Series</th>
                        <th style={tblCell}>Publishers</th>
                        <th style={tblCell}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {   // haettu data. Taulukon riveinä sarjan nimi ja julkaisijan nimi.
                        useMemo( () => series.map((s, index) => {
                            return (
                                <tr key={index}>
                                    <td style={tblCell}><button style={{color: "green"}} onClick={() => setBookToAdd(s.idbookseries)}>+</button>  <NavLink to={'/series/books/' + s.idbookseries}>{s.bookseries}</ NavLink></td>
                                    <td style={tblCell}>{s.publisher}</td>
                                    <td style={tblCell}><button onClick={() => openEditModal(s)}>Edit</button></td>
                                </tr>
                            )
                        }), [series])
                    } 
                </tbody>
            </table>
            <p>Can't find your series? Add it here: </p>
            <button onClick={openAddModal}>Add series</button>
            { modalOpen && <BrowserAddSeries closeAddModal={closeAddModal} /> }
            { openEdit && <BrowserEditSeries closeEditModal={closeEditModal} seriesToEdit={seriesToEdit} />}
        </div>
    )
}

// Komponentti, jossa näytetään yksittäiseen sarjaan kuuluvat kirjat
export const SeriesInfo = (props) => {
    const [bookData, setBookData] = useState([]);
    const params = useParams();
    const {idbookseries} = params;
    const [bookToAdd, setBookToAdd] = useState();
    const [thisSeries, setThisSeries] = useState({});

    const [allBooks, setAllBooks] = useState([]);
    const user = props.user;
    const [bookshelf, setBookshelf] = useState(null);

    const [modalOpen, setModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const openAddModal = () => {
        setModalOpen(true);
    }
    const closeAddModal = () => {
        setModalOpen(false);
    }

    const openEditModal = () => {
        console.log("Series to edit (openEditModal): ", thisSeries);
        setOpenEdit(true);
    }
    const closeEditModal = () => {
        setOpenEdit(false)
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
            
        }

        fetchBooks();
    }, [modalOpen]);


    useEffect(() => {
        const fetchBookshelf = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf");
            let bookshelfs = await response.json();
            let userBookshelf = bookshelfs.find((b) => b.iduser == user.iduser);
            setBookshelf(userBookshelf);
        }
        if (bookshelf == null) fetchBookshelf();
    }, [bookshelf, user.iduser]);

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


    const renderTableRows = () => {
        console.log("In renderTableRows: ", bookData);
        return bookData.map((b) => (
            <tr key={b.idbook}>
                <td>
                    {bookToAdd === b.idbook ?
                        <button onClick={() => insertBook(b.idbook)}>Confirm</button> :
                        <button style={{color: "green"}} onClick={() => setBookToAdd(b.idbook)}>+</button>
                    }
                    <NavLink to={'/series/books/book/' + b.idbook}>{b.bookname}</ NavLink>
                </td>
                <td>{b.publicationyear}</td>
            </tr>
        ));
    };
    

    return (
        <div>
            <NavLink to="/series" style={{textDecoration: "none", color: "grey"}}>← Back to series</NavLink>
            <h2>{thisSeries.bookseries}</h2>
            <p><b>Publisher:</b> {thisSeries.publisher}</p>
            <p><b>Description:</b> {thisSeries.description}</p>
            <p><b>Classification:</b> {thisSeries.classification}</p>
            <p>Edit information about the series: <button onClick={openEditModal}>Edit</button></p>
            { openEdit && <BrowserEditSeries closeEditModal={closeEditModal} seriesToEdit={thisSeries} />}
            <table>
                <thead>
                    <tr style={{height: "35px", backgroundColor: "lavender"}}>
                        <th>Books</th>
                        <th>Publication year</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows()}
                </tbody>
            </table>
            <p>Add new books to the series here:</p>
            <button onClick={openAddModal}>New book</button>
            { modalOpen && <BrowserAddBook closeAddModal={closeAddModal} seriesid={idbookseries}/> }
        </div>
    )
}

export const BookInfo = (props) => {
    const [oneBook, setOneBook] = useState({});
    const params = useParams();
    const {idbook} = params;

    const [allBooks, setAllBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(null);
    const [thisArtwork, setThisArtwork] = useState({});
    const [bookImage, setBookImage] = useState(null);
    const [imageUpdate, setImageUpdate] = useState(false);
    const user = props.user;

    const [addClicked, setAddClicked] = useState(false);
    const [quickAddBook, setQuickAddBook] = useState({});

    const [modalOpen, setModalOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [addPicture, setAddPicture] = useState(false);

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

            let findArtwork = allArtwork.find((a) => a.idbook == idbook);
            console.log("fetchBookImages findArtwork: ", findArtwork);

            setThisArtwork(findArtwork);
            console.log("fetchBookImages thisArtwork: ", thisArtwork);
        };

        fetchBookImages();
        fetchBook();
    }, [idbook, openEdit, imageUpdate]);

    useEffect(() => {
        const fetchBookPicture = async () => {
            let picId = thisArtwork.idpicture;
            let response = await fetch("http://localhost:5000/api/picture/");
            let picture = await response.json();
            let findpicture = picture.find((p) => p.idpicture == picId);
            setBookImage(findpicture);
        };

        if (thisArtwork != null) fetchBookPicture();
    }, [thisArtwork])

    useEffect(() => {
        const fetchBookshelf = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf");
            let bookshelves = await response.json();
            let userBookshelf = bookshelves.find((b) => b.iduser == user.iduser);
            setBookshelf(userBookshelf);
        }
        if (bookshelf == null) fetchBookshelf();
    }, [bookshelf, user.iduser]);

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

    const insertPicture = async () => {

    }

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

    const openPictureModal = () => {
        setAddPicture(true);
    }
    const closePictureModal = () => {
        setAddPicture(false);
    }

    return (
        <div>
            <NavLink to={"/series/books/" + oneBook.idbookseries} style={{textDecoration: "none", color: "grey"}}>← Back to books</NavLink>
            <h3>{oneBook.bookname}</h3>
            {bookImage ? <img src={`${bookImage.filename}`} /> : <img src="https://i.imgur.com/Qr08eFc.png" style={{width: "250px", height: "250px"}} />}
            {bookImage ? <p><button>Change the cover picture</button></p> : <p><button onClick={openPictureModal}>Add a cover picture</button></p>}
            {addPicture && <BrowserAddPic closePictureModal={closePictureModal} bookid={idbook} setImageUpdate={setImageUpdate} />}

            <p>{oneBook.publicationyear}</p>
            <p>Author: {oneBook.writer}</p>
            <p>Description: {oneBook.description}</p>
            <button onClick={(e) => {e.preventDefault(); setAddClicked(true)}}>Quick add</button> 
            {addClicked && <button onClick={() => insertBook(quickAddBook)}>Confirm</button>}
            
            <button onClick={openModal}>Add with information</button>
            {modalOpen && <AddBookModal closeModal={closeModal} insertBook={insertBook} id={oneBook.idbook} />}
            
            <p>Edit information about this book: <button onClick={openEditModal}>Edit</button></p>
            { openEdit && <BrowserEditBook closeEditModal={closeEditModal} bookToEdit={oneBook} />}
        </div>
    )
}

const AddBookModal = ({ closeModal, insertBook, id }) => {
    const [edition, setEdition] = useState();
    const [purchaseprice, setPurchaseprice] = useState();
    const [purchasedate, setPurchasedate] = useState();
    const [condition, setCondition] = useState();
    const [solddate, setSolddate] = useState();
    const [soldprice, setSoldprice] = useState();

    const handleAdd = (event) => {
        event.preventDefault();
        const newCopy = {
            id: id,
            edition: parseInt(edition),
            purchaseprice: parseFloat(purchaseprice),
            purchasedate: purchasedate,
            condition: parseInt(condition),
            solddate: solddate,
            soldprice: parseFloat(soldprice),
        };
        console.log(newCopy);
        insertBook(newCopy);
        closeModal();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Add Book with Information</h2>
                <form>
                    <label>
                        Edition:
                        <input type="number" value={edition} onChange={(e) => setEdition(e.target.value)}></input>
                    </label>
                    <label>
                        Purchase price:
                        <input type="text" value={purchaseprice} onChange={(e) => setPurchaseprice(e.target.value)}></input>
                    </label>
                    <label>
                        Purchase date:
                        <input type="date" value={purchasedate} onChange={(e) => setPurchasedate(e.target.value)}></input>
                    </label>
                    <label>
                        Condition:
                        <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                    </label>
                    <label>
                        Sold on:
                        <input type="date" value={solddate} onChange={(e) => setSolddate(e.target.value)}></input>
                    </label>
                    <label>
                        Sold price:
                        <input type="text" value={soldprice} onChange={(e) => setSoldprice(e.target.value)}></input>
                    </label>
                    <button onClick={(e) => handleAdd(e)}>Add Book</button>
                </form>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};