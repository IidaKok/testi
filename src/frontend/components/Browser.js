import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const SeriesBrowser = () => {
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
                                    <td style={tblCell}><a href='#' style={{color: "green", textDecoration: "none"}}>+</a>  <NavLink to={'/series/books/' + s.idbookseries}>{s.bookseries}</ NavLink></td>
                                    <td style={tblCell}><a href='#' style={noUnderLine} onClick={(e) => e.preventDefault()}>{s.publisher}</a></td>
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
export const SeriesInfo = () => {
    const [bookData, setBookData] = useState([]);
    const params = useParams();
    const {idbookseries} = params;

    useEffect( () => {

        const fetchBooks = async () => {

            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            let filteredBooks = books.filter((b) => b.idbookseries == idbookseries);

            setBookData(filteredBooks);       
            
        }

        fetchBooks();
    }, []);

    const renderTableRows = () => {
        console.log("In renderTableRows: ", bookData);
        return bookData.map((b) => (
            <tr key={b.idbook}>
                <td><a href='#' style={{color: "green", textDecoration: "none"}}>+</a>  <NavLink to={'/series/books/book/' + b.idbook}>{b.bookname}</ NavLink></td>
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

export const BookInfo = () => {
    const [oneBook, setOneBook] = useState({});
    const params = useParams();
    const {idbook} = params;

    useEffect( () => {

        const fetchBook = async () => {
            console.log(idbook);
            let response = await fetch("http://localhost:5000/api/book");
            let books = await response.json();
            let findBook = books.find((b) => b.idbook == idbook);
            console.log(findBook);
            setOneBook(findBook);      
            
        }

        fetchBook();
    }, []);

    return (
        <div>
            <NavLink to={"/series/books/" + oneBook.idbookseries} style={{textDecoration: "none", color: "grey"}}>← Back to books</NavLink>
            <h3>{oneBook.bookname}</h3>
            <p>{oneBook.publicationyear}</p>
            <p>Author: {oneBook.writer}</p>
            <p>Description: {oneBook.description}</p>
            <button>Add to your library</button>
        </div>
    )
}