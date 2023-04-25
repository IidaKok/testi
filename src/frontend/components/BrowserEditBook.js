import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const BrowserEditBook = ({ closeEditModal, bookToEdit }) => {
    const idbook = bookToEdit.idbook;
    const [bookname, setBookName] = useState(bookToEdit.bookname);
    const [publicationyear, setPublicationYear] = useState(bookToEdit.publicationyear);
    const [description, setDescription] = useState("description");
    const idbookseries = bookToEdit.idbookseries;
    const [seriesnumber, setSeriesNumber] = useState(bookToEdit.seriesnumber);
    const [writer, setWriter] = useState(bookToEdit.writer);

    console.log("Book to edit: ", bookToEdit);

    const handleEdit = async (event) => {
        event.preventDefault();
        console.log(idbook, bookname, publicationyear, description, idbookseries, seriesnumber, writer);

        try {
            const response = await fetch(`http://localhost:5000/api/book/${idbook}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    idbook: idbook,
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
            closeEditModal();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };


    return (
        <div className="animate__animated animate__fadeIn">
            <div className="modal-overlay">
                <div className="modal-content">
                    <form>
                        <label>
                            Name:
                            <input type="text" value={bookname} onChange={(e) => setBookName(e.target.value)} />
                        </label>
                        <label>
                            Publication Year:
                            <input type="number" min="1901" max="2155" value={publicationyear} onChange={(e) => setPublicationYear(e.target.value)} />
                        </label>
                        <label>
                            Description:
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </label>
                        <label>
                            Series number:
                            <input type="text" value={seriesnumber} onChange={(e) => setSeriesNumber(e.target.value)} />
                        </label>
                        <label>
                            Writer:
                            <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)}></input>
                        </label>
                        <button className='add-books-btn' onClick={(e) => handleEdit(e)}>Edit</button>
                        <button className='add-books-btn' onClick={() => closeEditModal()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};