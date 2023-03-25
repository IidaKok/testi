import { async } from 'q';
import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const SeriesBrowser = (props) => {
    const [series, setSeries] = useState([]);

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
    
    // haetaan sarjat tietokannasta:
    useEffect( () => {
        const fetchSeries = async () => {
            let response = await fetch("http://localhost:5000/api/bookseries");
            let c = await response.json();
            setSeries(c);
            console.log("series: ", series);
        }

        fetchSeries();
    }, []);

    /*
    const handleClick = (serId) => {
        history.push({
            pathname: '/series/books',
            state: { serId }
        });
    }
    */

    return (
        <div>
            <table >
                <thead>
                    <tr style={{height: "35px", backgroundColor: "lavender"}}>
                        <th style={tblCellSer}>Series</th>
                        <th style={tblCell}>Publishers</th>
                    </tr>
                </thead>
                <tbody>
                    {   // haettu data. Taulukon riveinä sarjan nimi ja julkaisijan nimi.
                        useMemo( () => series.map((s, index) => {
                            return (
                                <tr key={index}>
                                    <td style={tblCell}><button style={{color: "green"}}>+</button>  <NavLink to={'/series/books/' + s.idbookseries}>{s.bookseries}</ NavLink></td>
                                    <td style={tblCell}>{s.publisher}</td>
                                </tr>
                            )
                        }), [series])
                    } 
                </tbody>
            </table>
        </div>
    )
}

// Komponentti, jossa näytetään yksittäiseen sarjaan kuuluvat kirjat
export const SeriesInfo = (props) => {
    const [bookData, setBookData] = useState([]);
    const params = useParams();
    const {idbookseries} = params;
    const [bookToAdd, setBookToAdd] = useState();

    const [allBooks, setAllBooks] = useState([]);
    const user = props.user;
    const [bookshelf, setBookshelf] = useState(null);
    const [addClicked, setAddClicked] = useState(false);

    useEffect( () => {

        const fetchBooks = async () => {

            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            setAllBooks(books);
            let filteredBooks = books.filter((b) => b.idbookseries == idbookseries);

            setBookData(filteredBooks);       
            
        }

        fetchBooks();
    }, []);


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
        setAddClicked(false);
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
            
        </div>
    )
}

export const BookInfo = (props) => {
    const [oneBook, setOneBook] = useState({});
    const params = useParams();
    const {idbook} = params;

    const [allBooks, setAllBooks] = useState([]);
    const [bookshelf, setBookshelf] = useState(null);
    const user = props.user;

    const [addClicked, setAddClicked] = useState(false);

    useEffect(() => {
        const fetchBook = async () => {
            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            setAllBooks(books);
            let findBook = books.find((b) => b.idbook == idbook);
            setOneBook(findBook);      
        }
        fetchBook();
    }, [idbook]);

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
        setAddClicked(false);
    };

    return (
        <div>
            <NavLink to={"/series/books/" + oneBook.idbookseries} style={{textDecoration: "none", color: "grey"}}>← Back to books</NavLink>
            <h3>{oneBook.bookname}</h3>
            <p>{oneBook.publicationyear}</p>
            <p>Author: {oneBook.writer}</p>
            <p>Description: {oneBook.description}</p>
            <button onClick={(e) => {e.preventDefault(); setAddClicked(true)}}>Add to your library</button>
            {addClicked && <button onClick={() => insertBook(oneBook.idbook)}>Confirm</button>}
        </div>
    )
}