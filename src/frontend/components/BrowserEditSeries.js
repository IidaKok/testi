import { useState, useEffect, useMemo } from 'react';
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import "../App.css";

export const BrowserEditSeries = ({ closeEditModal, seriesToEdit }) => {
    const [bookseries, setBookSeries] = useState(seriesToEdit.bookseries);
    const [publisher, setPublisher] = useState(seriesToEdit.publisher);
    const [description, setDescription] = useState(seriesToEdit.description);
    const [classification, setClassification] = useState(seriesToEdit.classification);

    console.log("Series to edit: ", seriesToEdit);

    const handleEdit = async (event) => {
        event.preventDefault();
        console.log(seriesToEdit.idbookseries, bookseries, publisher, description, classification);

        try {
            const response = await fetch(`http://localhost:5000/api/bookseries/${seriesToEdit.idbookseries}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    idbookseries: seriesToEdit.idbookseries,
                    bookseries: bookseries,
                    publisher: publisher,
                    description: description,
                    classification: classification,
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
                        <button className='add-books-btn' onClick={(e) => handleEdit(e)}>Edit</button>
                        <button className='add-books-btn' onClick={() => closeEditModal()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
