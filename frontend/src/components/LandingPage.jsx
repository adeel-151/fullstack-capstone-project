import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landing-container">
            <header className="hero">
                <div className="hero-content">
                    <h1 className="project-title">Giftopia</h1>
                    <p className="tagline">Discover the perfect gift for every occasion.</p>
                    <p className="description">Explore our curated collection of accessories, home goods, fitness gear, and more. Your next great find is just a click away.</p>
                    <div className="cta-buttons">
                        <Link to="/gifts" className="btn btn-primary get-started-btn">Get Started</Link>
                        <Link to="/register" className="btn btn-secondary">Register</Link>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default LandingPage;
