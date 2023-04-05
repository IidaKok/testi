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
        var seriesdata = {
            bookseries: bookseries,
            publisher: publisher,
            description: description,
            classification: classification,
        };
        console.log(seriesdata);

        try {
            const response = await fetch("http://localhost:5000/api/bookseries", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    bookseries: seriesdata.bookseries,
                    publisher: seriesdata.publisher,
                    description: seriesdata.description,
                    classification: seriesdata.classification,
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
                    <button onClick={(e) => handleAdd(e)}>Add</button>
                </form>
                <button onClick={() => closeAddModal()}>Cancel</button>
            </div>
        </div>
    );
};