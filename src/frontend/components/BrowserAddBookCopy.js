import { useState } from 'react';
import "../App.css";

export const AddBookModal = ({ closeModal, insertBook, id }) => {
    const [edition, setEdition] = useState();
    const [purchaseprice, setPurchaseprice] = useState();
    const [purchasedate, setPurchasedate] = useState(null);
    const [condition, setCondition] = useState();
    const [solddate, setSolddate] = useState(null);
    const [soldprice, setSoldprice] = useState();

    function isValidDate(dateString) {

        const pattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateString || !pattern.test(dateString)) {
            return false;
        };

        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return false;
        };

        return true;
    }

    const handleAdd = (event) => {
        event.preventDefault();

        if (solddate && !isValidDate(solddate)) {
            alert("Invalid sold date format. Please use the format YYYY-MM-DD.");
            return;
        };
        if (purchasedate && !isValidDate(purchasedate)) {
            alert("Invalid purchase date format. Please use the format YYYY-MM-DD.");
            return;
        };

        if (!solddate) setSolddate(null);
        if (!purchasedate) setPurchasedate(null);

        const newCopy = {
            id: id,
            edition: parseInt(edition),
            purchaseprice: parseFloat(purchaseprice),
            purchasedate: purchasedate,
            condition: parseInt(condition),
            solddate: solddate,
            soldprice: parseFloat(soldprice),
        };
        console.log(newCopy);
        insertBook(newCopy);
        closeModal();
    };

    return (
        <div className='animate__animated animate__fadeIn'>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Add Book with Information</h2>
                    <form>
                        <label>
                            Edition:
                            <input type="number" value={edition} onChange={(e) => setEdition(e.target.value)}></input>
                        </label>
                        <label>
                            Purchase price:
                            <input type="text" value={purchaseprice} onChange={(e) => setPurchaseprice(e.target.value)}></input>
                        </label>
                        <label>
                            Purchase date:
                            <input type="date" value={purchasedate} onChange={(e) => setPurchasedate(e.target.value)}></input>
                        </label>
                        <label>
                            Condition:
                            <select value={condition} onChange={(e) => setCondition(e.target.value)}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </label>
                        <label>
                            Sold on:
                            <input type="date" value={solddate} onChange={(e) => setSolddate(e.target.value)}></input>
                        </label>
                        <label>
                            Sold price:
                            <input type="text" value={soldprice} onChange={(e) => setSoldprice(e.target.value)}></input>
                        </label>
                        <button className='add-books-btn' onClick={(e) => handleAdd(e)}>Add Book</button>
                        <button className='add-books-btn' onClick={closeModal}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};