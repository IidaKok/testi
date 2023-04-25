import { useState } from 'react';
import "../App.css";

export const BrowserAddSeries = ({ closeAddModal, idbookshelf }) => {
    const [bookseries, setBookSeries] = useState("");
    const [publisher, setPublisher] = useState("");
    const [description, setDescription] = useState("");
    const [classification, setClassification] = useState("");
    const [idBookseries, setIdBookseries] = useState();

    const handleAdd = async (event) => {
        event.preventDefault();
        console.log(bookseries, publisher, description, classification);
        console.log("in handleAdd: idbookseries: " + idBookseries + " idbookshelf: " + idbookshelf);

        const postUserseries = async (idbookser, idbookshel) => {
            console.log("in postUserseries: " + idbookser + " " + idbookshel);
            try {
                const response = await fetch("http://localhost:5000/api/userseries", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        idbookseries: idbookser,
                        idbookshelf: idbookshel,
                    }),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Network response was not ok");
                }

                const data = await response.json();
                console.log("Userseries created: ", data);

            } catch (error) {
                console.error(error);
                alert(error.message);
            };
        };

        try {
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

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            const data = await response.json();
            console.log("Series created: ", data.id);
            setIdBookseries(data.id);
            console.log("idbookseries: " + data.id + " idbookshelf: " + idbookshelf);
            if (data.id != null && idbookshelf != null) postUserseries(data.id, idbookshelf);

            // Close the modal after adding the new series
            closeAddModal();
        } catch (error) {
            console.error(error);
            alert(error.message);
        };
    };


    return (
        <div className='animate__animated animate__fadeIn'>
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
                        <button className='add-books-btn' onClick={(e) => handleAdd(e)}>Add</button>
                        <button className='add-books-btn' onClick={() => closeAddModal()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};