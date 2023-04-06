import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const BrowserAddBook = ({ closeAddModal, seriesid }) => {
    const [bookname, setBookName] = useState();
    const [publicationyear, setPublicationYear] = useState();
    const [description, setDescription] = useState();
    const idbookseries = seriesid;
    const [seriesnumber, setSeriesNumber] = useState();
    const [writer, setWriter] = useState();

    const handleAdd = async (event) => {
        event.preventDefault();
        console.log(bookname, publicationyear, description, idbookseries, seriesnumber, writer);

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
            }

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
        <div className="modal">
            <div className="modal-content">
                <form>
                    <label>
                        Name:
                        <input type="text" onChange={(e) => setBookName(e.target.value)}></input>
                    </label>
                    <label>
                        Publication Year:
                        <input type="number" onChange={(e) => setPublicationYear(e.target.value)}></input>
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
                    <button onClick={(e) => handleAdd(e)}>Add</button>
                </form>
                <button onClick={() => closeAddModal()}>Cancel</button>
            </div>
        </div>
    );
};