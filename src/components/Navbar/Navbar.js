import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src="/path-to-your-hotel-icon.png" alt="Hotel Icon" className="hotel-icon" />
            </div>
            <div className="navbar-right">
                <a href="/dashboard">Dashboard</a>
                <a href="/guests">Guests</a>
                <a href="/staff">Staff</a>
                <a href="/reports">Reports</a>
                <a href="/tickets">Tickets</a>
                <a href="/rooms">Rooms</a>
                <a href="/facilities">Facilities</a>
            </div>
        </nav>
    );
};

export default Navbar;
