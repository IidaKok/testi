/* väliaikaisesti kommentoitu

import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Addbook = () => {
    const [bookcopy, setBookcopy] = useState({
        bookname: "",
        edition: "",
        publicationyear: "",
        purchaseprice: "",
        condition: "",
        description: "",
        soldprice: "",
        purchasedate: "",
        solddate: "",
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBookcopy(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };

    const handleClick = async e => {
        e.preventDefault()
        try {
            await axios.post("http://localhost:5000/api/bookcopy/", bookcopy)
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
            <input className="user-input" type="text" placeholder="bookname" onChange= { handleChange } name="bookname"/>
            <input className="user-input" type="number" placeholder="edition" onChange= { handleChange } name="edition"/>
            <input className="user-input" type="number" min="1700" max="2050" placeholder="publicationyear" onChange= { handleChange }  name="publicationyear"/>
            <input className="user-input" type="number" placeholder="purchaseprice" onChange= { handleChange }  name="purchaseprice"/>
            <input className="user-input" type="number" placeholder="condition" onChange= { handleChange }  name="condition"/>
            <input className="user-input" type="text" placeholder="description" onChange= { handleChange }  name="description"/>
            <input className="user-input" type="number" placeholder="soldprice" onChange= { handleChange } name="soldprice"/>
            <p>Purchasedate</p>
            <input className="user-input" type="date" placeholder="purchasedate" onChange= { handleChange }  name="purchasedate"/>
            <p>Solddate</p>
            <input className="user-input" type="date" placeholder="solddate" onChange={handleChange} name="solddate" />
            <button className="formAddBtn" onClick={handleClick}>Add</button>
            <button className="formCancelBtn" onClick={handleCancel}>Cancel</button>
        </div>
    )
}

export { Addbook }

*/