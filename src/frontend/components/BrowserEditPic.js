import { useState } from 'react';
import "../App.css";

export const BrowserEditPic = ({ closeEditPicModal, picToEdit, setImageUpdate }) => {
    const [picturename, setPicturename] = useState(picToEdit.picturename);
    const [publicationyear, setPublicationyear] = useState(picToEdit.publicationyear);
    const [artist, setArtist] = useState(picToEdit.artist);
    const [style, setStyle] = useState(picToEdit.style);
    const [description, setDescription] = useState(picToEdit.description);
    const [filename, setFilename] = useState(picToEdit.filename);

    console.log("Series to edit: ", picToEdit);

    const handleEdit = async (event) => {
        event.preventDefault();
        console.log(picToEdit.idpicture);

        try {
            const response = await fetch(`http://localhost:5000/api/picture/${picToEdit.idpicture}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    idpicture: picToEdit.idpicture,
                    picturename: picturename,
                    publicationyear: publicationyear,
                    artist: artist,
                    style: style,
                    description: description,
                    filename: filename,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Network response was not ok");
            }

            const data = await response.json();
            console.log(data);

            // Close the modal after adding the new series
            closeEditPicModal();
        } catch (error) {
            console.error(error);
            alert(error.message);
        };

        setImageUpdate();
    };


    return (
        <div className="animate__animated animate__fadeIn">
            <div className="modal-overlay">
                <div className="modal-content">
                    <form>
                        <label>
                            Name:
                            <input type="text" value={picturename} onChange={(e) => setPicturename(e.target.value)}></input>
                        </label>
                        <label>
                            Publication year:
                            <input type="text" value={publicationyear} onChange={(e) => setPublicationyear(e.target.value)}></input>
                        </label>
                        <label>
                            Artist:
                            <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)}></input>
                        </label>
                        <label>
                            Style:
                            <input type="text" value={style} onChange={(e) => setStyle(e.target.value)}></input>
                        </label>
                        <label>
                            description:
                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}></input>
                        </label>
                        <label>
                            Link:
                            <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)}></input>
                        </label>
                        <button className='add-books-btn' onClick={(e) => handleEdit(e)}>Edit</button>
                        <button className='add-books-btn' onClick={() => closeEditPicModal()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};