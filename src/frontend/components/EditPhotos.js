import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../App.css";

const EditPhotos = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];
    const [photos, setPhotos] = useState([]);
    const [newPhotoName, setNewPhotoName] = useState("");
    const [newPageNumber, setNewPageNumber] = useState("");
    const [shouldRender, setShouldRender] = useState(false);

    // Listen for changes in the `shouldRender` state variable and re-fetch the photos
    useEffect(() => {
        const fetchPhotos = async () => {
            let response = await fetch("http://localhost:5000/api/photo/" + bookId);
            if (response.ok) {
                let c = await response.json();
                setPhotos(c);
            }
        };
        fetchPhotos();
    }, [bookId, shouldRender]); // Include `shouldRender` in the dependencies array
    
    const handleUpdate = async (e, photo) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/photo/${photo.idphoto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    photoname: newPhotoName !== "" ? newPhotoName : photo.photoname,
                    pagenumber: newPageNumber !== "" ? newPageNumber : photo.pagenumber
                })
            });

            if (response.ok) {
                const updatedPhoto = await response.json();
                const updatedPhotos = photos.map((p) => {
                    if (p.idphoto === updatedPhoto.idphoto) {
                        return updatedPhoto;
                    } else {
                        return p;
                    }
                });
                setPhotos(updatedPhotos);
                setNewPhotoName("");
                setNewPageNumber("");
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);
            }
            navigate("/userPage");
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "photoname") {
            setNewPhotoName(e.target.value);
        } else if (e.target.name === "pagenumber") {
            setNewPageNumber(e.target.value);
        }
    };

    const handleAdd = async () => {

        // Validate input
        const errors = {};

        if (!/^https?:\/\/.+$/i.test(newPhotoName)) {
            errors.photoname = "Image-URL should be a valid URL";
        }

        const parsedPageNumber = parseInt(newPageNumber, 10);
        if (isNaN(parsedPageNumber) || parsedPageNumber < 0 || parsedPageNumber > 99999) {
            errors.pagenumber = "Page number should be an integer between 0 and 99999";
        }

        if (Object.keys(errors).length > 0) {
            const message = Object.entries(errors)
                .map(([field, error]) => `${field}: ${error}`)
                .join("\n");
            alert(message);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/photo/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    photoname: newPhotoName,
                    pagenumber: newPageNumber,
                    idbookcopy: bookId,
                }),
            });

            if (response.ok) {
                const newPhoto = await response.json();
                setPhotos([...photos, newPhoto]);
                setNewPhotoName("");
                setNewPageNumber("");
                setShouldRender(!shouldRender); // Trigger a re-render of the component
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/photo/idphoto/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                const updatedPhotos = photos.filter((photo) => photo.idphoto !== id);
                setPhotos(updatedPhotos);
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancel = (e) => {
        navigate("/userPage")
    }

    return (
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className="editphotos">
                <input id="user-input" size="30" type="text" placeholder="Image-URL" onChange={handleChange} name="photoname" maxLength={255} value={newPhotoName} />
                <input id="user-input" size="30" type="number" placeholder="Page number" onChange={handleChange} name="pagenumber" onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} value={newPageNumber} />
                <button className="photoAddBtn" onClick={handleAdd}>Add a new photo to your book</button>
                <div className="photo-grid">
                    {photos.map((photo) => (
                        <div className="photo" key={photo.idphoto}>
                            <div className="photo-wrapper">
                                <span className="pagenumber">{`Page ${photo.pagenumber}`}</span>
                                <img src={photo.photoname} alt={`Page ${photo.pagenumber}`} />
                            </div>
                            <input id="user-input" size="30" type="text" placeholder="Image-URL" onChange={handleChange} name="photoname" maxLength={255} />
                            <input id="user-input" size="30" type="number" placeholder="Page number" onChange={handleChange} name="pagenumber" onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }} />
                            <button className="photoAddBtn" onClick={(e) => handleUpdate(e, photo)}>Update</button>
                            <p></p>
                            <button className="photoDeleteBtn" onClick={() => handleDelete(photo.idphoto)}>Delete Photo</button>
                            <p></p>
                        </div>
                    ))}
                </div>
                <button className="formCancelBtn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export { EditPhotos }