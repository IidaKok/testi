import React from 'react';
import { useState } from 'react';
import '../App.css';

const Addseries = () => {
    const [bookseries, setBookseries] = useState({
        bookseries: '',
        publisher: '',
        description: '',
        classification: '',
    });

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

        try {
            const response = await fetch('http://localhost:5000/api/bookseries/post/', {
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
                throw new Error('Network response was not ok');
            }
            console.log('INSERT:', bookseries);
            setBookseries({
                bookseries: '',
                publisher: '',
                description: '',
                classification: '',
            });
            window.location.href = '/userPage';
        } catch (err) {
            console.log(err);
            alert('Error: ' + err.message);
        }
    };

    const handleChange = (e) => {
        setBookseries((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleCancel = (e) => {
        window.location.href = '/userPage';
    };

    return (
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
    );
};

export { Addseries };
