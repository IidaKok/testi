import { React, useState, useEffect } from 'react';
import "../App.css";

export const BrowserAddPic = ({ closePictureModal, bookid, setImageUpdate }) => {
    const [picturename, setPicturename] = useState();
    const [picPublicationyear, setPicPublicationyear] = useState();
    const [artist, setArtist] = useState();
    const [style, setStyle] = useState();
    const [picDescription, setPicDescription] = useState();
    const [filename, setFilename] = useState();
    const idbook = bookid;

    const [pictureId, setPictureId] = useState();
    const [pagenumber, setPagenumber] = useState();
    const [imageUpdate] = useState(false);
    const [fetchPic, setFetchPic] = useState(false);

    const handleAdd = async (event) => {
        event.preventDefault();

        console.log("In handleAdd: ", picturename, picPublicationyear, artist, style, picDescription, filename);

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
                    pagenumber: null,
                }),
            });
            if (!responseArt.ok) {
                const errorText = await responseArt.text();
                throw new Error(errorText || "Network response was not ok");
            };

            closePictureModal();
            setImageUpdate(!imageUpdate);
        };
        if (fetchPic) fetchPicture();
    }, [fetchPic]);


    return (
        <div className="modal">
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
                    <button onClick={(e) => handleAdd(e)}>Add</button>
                </form>
                <button onClick={() => closePictureModal()}>Cancel</button>
            </div>
        </div>
    );
}
