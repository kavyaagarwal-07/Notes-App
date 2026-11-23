import React from "react";
import "./Navbar.css";

const Navbar = ({ searchTerm, setSearchTerm }) => {
    return (
        <header className="navbar">

            {/* Search Bar */}
            <div className="search-container">
                <span>🔍</span>

                <input
                    type="text"
                    placeholder="Search notes by title or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Navbar Actions */}
            <div className="navbar-actions">
                <button className="theme-btn">☀️</button>
                <div className="profile-avatar">K</div>
            </div>

        </header>
    );
};

export default Navbar;
