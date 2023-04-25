import React from 'react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "../App.css";

const Update = (props) => {
    const [bookcopy, setBookcopy] = useState({});
    const navigate = useNavigate();
    const { user } = props;
    const location = useLocation();
    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:5000/api/bookshelf/" + user.iduser);
            const data = await response.json();
            setBookcopy(data);
        }
        fetchBooks();
    }, [user.iduser]);

    const handleChange = (e) => {
        setBookcopy(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleClick = async (e) => {
        try {
            // Update the bookcopy record
            await fetch(`http://localhost:5000/api/bookcopy/${bookId}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    bookname: bookcopy.bookname,
                    edition: parseInt(bookcopy.edition),
                    publicationyear: parseInt(bookcopy.publicationyear),
                    purchaseprice: parseFloat(bookcopy.purchaseprice),
                    purchasedate: bookcopy.purchasedate,
                    condition: parseInt(bookcopy.condition),
                    description: bookcopy.description,
                    solddate: bookcopy.solddate,
                    soldprice: parseFloat(bookcopy.soldprice),
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === undefined) {
                        console.log("UPDATE:", bookcopy);
                        setBookcopy(null);
                    }
                });

            navigate("/userPage");
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = (e) => {
        navigate("/userPage")
    }

    return (
        <div className="animate__animated animate__fadeIn animate__slow">
            <div className="update-bookcopy-form">
                <h1>Update the Book</h1>
                <input id="user-input" type="text" placeholder="bookname" onChange={handleChange} name="bookname" />
                <input id="user-input" type="number" placeholder="edition" onChange={handleChange} name="edition" onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} />
                <input id="user-input" type="number" placeholder="publicationyear" onChange={handleChange} name="publicationyear" onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} />
                <select id="user-input" onChange={handleChange} name="condition">
                    <option value="">Select book condition</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <input id="user-input" type="text" placeholder="description" onChange={handleChange} name="description" maxLength={255} />
                <p>Purchasedate</p>
                <input id="user-input" type="date" placeholder="purchasedate" onChange={handleChange} name="purchasedate" />
                <input id="user-input" type="number" placeholder="purchaseprice" onChange={handleChange} name="purchaseprice" onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} />
                <p>Solddate</p>
                <input id="user-input" type="date" placeholder="solddate" onChange={handleChange} name="solddate" />
                <input id="user-input" type="number" placeholder="soldprice" onChange={handleChange} name="soldprice" onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                    }
                }} />
                <button className="formAddBtn" onClick={handleClick}>Update</button>
                <button className="formCancelBtn" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    );
}

export { Update }