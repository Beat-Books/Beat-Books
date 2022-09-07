import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../stylesheet/styles.css";
import logo from "../../assets/logo.png"

function SearchContainer() {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');

    const navigate = useNavigate();

    const handleBookName = e => {
        setBookName(e.target.value);
    };
    const handleAuthor = e => {
        setAuthor(e.target.value);
    };

    const handleSubmit = () => {
        if (!bookName || !author) {
            alert("Please enter both fields.");
            return;
        }
        navigate("/loading", {state: { book: bookName, author: author}});
    }

    return (
        <div>
            <div className="form">
                <div className="header">
                    <img src={logo} width={'50%'} />
                </div>
                <b><label className="label">Book Name</label></b>
                <input type='text' value={bookName} onChange={handleBookName} className="userInput" />
                <br />
                <b><label className="label"> Author </label></b>
                <input type='text' value={author} onChange={handleAuthor} className="userInput" />
                <br />
                <button onClick={handleSubmit} className="submitButton">Submit</button>
            </div >
        </div >
    )
}



export default SearchContainer;