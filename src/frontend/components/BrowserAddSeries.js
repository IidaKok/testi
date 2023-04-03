import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const BrowserAddSeries = ({ closeAddModal }) => {
    const [bookseries, setBookSeries] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [classification, setClassification] = useState("");

    const handleAdd = async (event) => {
        event.preventDefault();
        console.log(bookseries, publisher, description, classification);

        const response = await fetch("http://localhost:5000/api/bookseries", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                bookseries: bookseries,
                publisher: publisher,
                description: description,
                classification: classification,
            }),
        });

        const data = await response.json();
        console.log(data);

        // Close the modal after adding the new series
        closeAddModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeAddModal}>
                    &times;
                </span>
                <form onSubmit={handleAdd}>
                    <label>
                        Series name:
                        <input type="text" value={bookseries} onChange={(e) => setBookSeries(e.target.value)} />
                    </label>
                    <label>
                        Publisher:
                        <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                    </label>
                    <label>
                        Description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <label>
                        Classification:
                        <input type="text" value={classification} onChange={(e) => setClassification(e.target.value)} />
                    </label>
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};