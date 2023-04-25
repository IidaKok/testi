import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const BrowserAddBook = ({ closeAddModal, seriesid }) => {
    const [bookname, setBookName] = useState(null);
    const [publicationyear, setPublicationYear] = useState(null);
    const [description, setDescription] = useState(null);
    const idbookseries = seriesid;
    const [seriesnumber, setSeriesNumber] = useState(null);
    const [writer, setWriter] = useState(null);

    const handleAdd = async (event) => {
        event.preventDefault();
        console.log(bookname, publicationyear, description, idbookseries, seriesnumber, writer);

        if (publicationyear == null || publicationyear == "") setPublicationYear(1901);

        try {
            const response = await fetch("http://localhost:5000/api/book", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    bookname: bookname,
                    publicationyear: publicationyear,
                    description: description,
                    idbookseries: idbookseries,
                    seriesnumber: seriesnumber,
                    writer: writer,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            };

            const data = await response.json();
            console.log(data);

            // Close the modal after adding the new series
            closeAddModal();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
      

    return (
        <div className='animate__animated animate__fadeIn'>
            <div className="modal-overlay">
            <div className="modal-content">
                <form>
                    <label>
                        Name:
                        <input type="text" onChange={(e) => setBookName(e.target.value)}></input>
                    </label>
                    <label>
                        Publication Year:
                        <input type="number" min="1901" max="2155" onChange={(e) => setPublicationYear(e.target.value)}></input>
                    </label>
                    <label>
                        Description:
                        <input type="text" onChange={(e) => setDescription(e.target.value)}></input>
                    </label>
                    <label>
                        Series Number:
                        <input type="number" onChange={(e) => setSeriesNumber(e.target.value)}></input>
                    </label>
                    <label>
                        Writer:
                        <input type="text" onChange={(e) => setWriter(e.target.value)}></input>
                    </label>
                    <button className='add-books-btn' onClick={(e) => handleAdd(e)}>Add</button>
                    <button className='add-books-btn' onClick={() => closeAddModal()}>Cancel</button>
                </form>
            </div>
        </div>
        </div>
    );
};