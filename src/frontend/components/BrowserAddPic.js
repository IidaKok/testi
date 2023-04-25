import { React, useState, useEffect } from 'react';
import "../App.css";

export const BrowserAddPic = ({ closePictureModal, bookid, setImageUpdate, cover }) => {
    const [picturename, setPicturename] = useState(null);
    const [picPublicationyear, setPicPublicationyear] = useState(null);
    const [artist, setArtist] = useState(null);
    const [style, setStyle] = useState(null);
    const [picDescription, setPicDescription] = useState(null);
    const [filename, setFilename] = useState(null);
    const idbook = bookid;

    const [pictureId, setPictureId] = useState();
    const [fetchPic, setFetchPic] = useState(false);

    const handleAdd = async (event) => {
        event.preventDefault();
        console.log("pagenumber: ", cover);

        console.log("In handleAdd: ", picturename, picPublicationyear, artist, style, picDescription, filename);

        if (picturename == "") setPicturename(null);
        if (picPublicationyear == "") setPicPublicationyear(null);
        if (artist == "") setArtist(null);
        if (style == "") setStyle(null);
        if (picDescription == "") setPicDescription(null);
        if (filename == "") setFilename(null);

        try {
            const responsePic = await fetch("http://localhost:5000/api/picture", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    picturename: picturename,
                    publicationyear: picPublicationyear,
                    artist: artist,
                    style: style,
                    description: picDescription,
                    filename: filename,
                }),
            });

            if (!responsePic.ok) {
                const errorText = await responsePic.text();
                throw new Error(errorText || "Network response was not ok");
            };
            if (responsePic.ok) { // saving the id of the newly added picture for artwork post method
                setFetchPic(true);
            };
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    useEffect(() => {
        const fetchPicture = async () => {
            let res = await fetch("http://localhost:5000/api/picture");
            let allpictures = await res.json();
            let thisPicture = allpictures.find((p) => p.filename == filename);
            console.log("thisPicture: ", thisPicture);
            setPictureId(thisPicture.idpicture);
            console.log("picture: ", pictureId);

            const responseArt = await fetch("http://localhost:5000/api/artwork", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    idbook: idbook,
                    idpicture: thisPicture.idpicture,
                    pagenumber: cover,
                }),
            });
            if (!responseArt.ok) {
                const errorText = await responseArt.text();
                throw new Error(errorText || "Network response was not ok");
            };

            closePictureModal();
            setImageUpdate();
        };
        if (fetchPic) fetchPicture();
    }, [fetchPic]);


    return (
        <div className='animate__animated animate__fadeIn'>
            <div className="modal-overlay">
                <div className="modal-content">
                    <form>
                        <label>
                            Name:
                            <input type="text" onChange={(e) => setPicturename(e.target.value)}></input>
                        </label>
                        <label>
                            Publication year:
                            <input type="text" onChange={(e) => setPicPublicationyear(e.target.value)}></input>
                        </label>
                        <label>
                            Artist:
                            <input type="text" onChange={(e) => setArtist(e.target.value)}></input>
                        </label>
                        <label>
                            Style:
                            <input type="text" onChange={(e) => setStyle(e.target.value)}></input>
                        </label>
                        <label>
                            description:
                            <input type="text" onChange={(e) => setPicDescription(e.target.value)}></input>
                        </label>
                        <label>
                            Link:
                            <input type="text" onChange={(e) => setFilename(e.target.value)}></input>
                        </label>
                        <button className='add-books-btn' onClick={(e) => handleAdd(e)}>Add</button>
                        <button className='add-books-btn' onClick={() => closePictureModal()}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
