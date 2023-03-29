import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../App.css";


const Addbook = (props) => {
    const [bookcopy, setBookcopy] = useState(null);
    const navigate = useNavigate();
    const { user } = props;
    const [shelf, setShelf] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            let response = await fetch("http://localhost:5000/api/bookshelf/" + user.iduser);
            if (response.ok) {
                let c = await response.json();
                setShelf(c);
            }
        }
        fetchBooks();
    }, [user.iduser]);

    const handleChange = (e) => {
        setBookcopy(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };


    const handleClick = async e => {
        e.preventDefault();

        // Check if all required fields have a value
        const requiredFields = ["bookname", "edition", "publicationyear", "purchaseprice", "purchasedate", "condition", "description", "solddate", "soldprice"];
        const missingFields = requiredFields.filter(field => !bookcopy[field]);

        if (missingFields.length > 0) {
            alert(`Please fill in the following fields: ${missingFields.join(", ")}`);
            return;
        }
        try {
            await fetch("http://localhost:5000/api/bookcopy/post/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    idbookcopy: bookcopy.idbookname,
                    bookname: bookcopy.bookname,
                    edition: bookcopy.edition,
                    publicationyear: bookcopy.publicationyear,
                    purchaseprice: bookcopy.purchaseprice,
                    purchasedate: bookcopy.purchasedate,
                    condition: bookcopy.condition,
                    description: bookcopy.description,
                    solddate: bookcopy.solddate,
                    soldprice: bookcopy.soldprice,
                    idbookshelf: shelf.idbookshelf
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message === undefined) {
                        console.log("INSERT:", bookcopy);
                        setBookcopy(null);
                        return;
                    }
                });
            navigate("/userPage")
        } catch(err) {
            console.log(err)
        }
    }
    const handleCancel = (e) => {
        navigate("/userPage")
    }

    return (
        <div className="add-bookcopy-form">
            <h1>Add New Book</h1>
            <input id ="user-input" type="text" placeholder="bookname" onChange= { handleChange } name="bookname"/>
            <input id ="user-input" type="number" placeholder="edition" onChange= { handleChange } name="edition"/>
            <input id ="user-input" type="number" placeholder="publicationyear" onChange= { handleChange }  name="publicationyear"/>
            <input id ="user-input" type="number" placeholder="purchaseprice" onChange= { handleChange }  name="purchaseprice"/>
            <input id ="user-input" type="number" placeholder="condition" onChange= { handleChange }  name="condition"/>
            <input id ="user-input" type="text" placeholder="description" onChange= { handleChange }  name="description"/>
            <input id ="user-input" type="number" placeholder="soldprice" onChange= { handleChange } name="soldprice"/>
            <p>Purchasedate</p>
            <input id ="user-input" type="date" placeholder="purchasedate" onChange= { handleChange }  name="purchasedate"/>
            <p>Solddate</p>
            <input id ="user-input" type="date" placeholder="solddate" onChange={handleChange} name="solddate" />
            <button className="formAddBtn" onClick={handleClick}>Add</button>
            <button className="formCancelBtn" onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export { Addbook }