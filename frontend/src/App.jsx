import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import RegisterPage from './components/RegisterPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import './index.css';

const GiftsPage = () => {
    const [gifts, setGifts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/gifts')
            .then(res => res.json())
            .then(data => setGifts(data))
            .catch(err => console.error(err));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/api/search?category=${searchTerm}`)
            .then(res => res.json())
            .then(data => setGifts(data))
            .catch(err => console.error(err));
    };

    return (
        <div className="gifts-page">
            <header className="navbar">
                <h2>Giftopia</h2>
                <form onSubmit={handleSearch} className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search by category..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                    <button type="submit" className="btn btn-primary">Search</button>
                </form>
            </header>
            <div className="gifts-grid">
                {gifts.map(gift => (
                    <div className="gift-card" key={gift._id || gift.id}>
                        <h3>{gift.name}</h3>
                        <p className="category">{gift.category}</p>
                        <p className="price">${gift.price}</p>
                        <p className="desc">{gift.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/gifts" element={<GiftsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
