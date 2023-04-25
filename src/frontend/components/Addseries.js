import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Addseries = (idbookshelf) => {
    const [idBookseries, setIdBookseries] = useState();

    const [bookseries, setBookseries] = useState({
        bookseries: '',
        publisher: '',
        description: '',
        classification: '',
    });
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();

        // Check if all required fields have a value
        const requiredFields = [
            'bookseries',
            'publisher',
            'description',
            'classification',
        ];
        const missingFields = requiredFields.filter(
            (field) => !bookseries[field]
        );

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields: ${missingFields.join(', ')}`);
            return;
        }

        console.log(bookseries.bookseries, bookseries.publisher, bookseries.description, bookseries.classification);
        console.log("in handleAdd: idbookseries: " + idBookseries + " idbookshelf: " + idbookshelf);

        const postUserseries = async (idbookser, idbookshel) => {
            console.log("in postUserseries: " + idbookser + " " + idbookshel);
            try {
                const idbookshelf = idbookshel.user.iduser; // Extract the integer value from the JSON object
                const response = await fetch("http://localhost:5000/api/userseries", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        idbookseries: idbookser,
                        idbookshelf: idbookshelf, // Pass the extracted integer value
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
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    bookseries: bookseries.bookseries,
                    publisher: bookseries.publisher,
                    description: bookseries.description,
                    classification: bookseries.classification,
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
            console.log('INSERT:', bookseries);
            setBookseries({
                bookseries: '',
                publisher: '',
                description: '',
                classification: '',
            });
            navigate('/series');
        } catch (err) {
            console.log(err);
            alert('Error: ' + err.message);
        }
    };

    const handleChange = (e) => {
        setBookseries((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCancel = (e) => {
        navigate('/userPage');
    };

    return (
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className='add-bookseries-form'>
                <h1>Add New Series</h1>
                <input
                    id='user-input'
                    type='text'
                    placeholder='Bookseries'
                    onChange={handleChange}
                    name='bookseries'
                    value={bookseries.bookseries}
                />
                <input
                    id='user-input'
                    type='text'
                    placeholder='Publisher'
                    onChange={handleChange}
                    name='publisher'
                    value={bookseries.publisher}
                />
                <input
                    id='user-input'
                    type='text'
                    placeholder='Description'
                    onChange={handleChange}
                    name='description'
                    value={bookseries.description}
                />
                <input
                    id='user-input'
                    type='text'
                    placeholder='Classification'
                    onChange={handleChange}
                    name='classification'
                    value={bookseries.classification}
                />
                <button className='formAddBtn' onClick={handleClick}>
                    Add
                </button>
                <button className='formCancelBtn' onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export { Addseries };
