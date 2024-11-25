// src/components/Lists/GuestList/GuestList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './GuestList.css';

const GuestList = () => {
    const [guests, setGuests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        axios.get('http://localhost:8080/api/guests/getGuests', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setGuests(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching guests:', error));
    }, []);

    const handleDetailsClick = (guestId) => {
        navigate(`/guests/${guestId}`);
    };

    return (
        <div className="list-container">
            <h3>Guest List</h3>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Room Number</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map(guest => (
                        <tr key={guest.id}>
                            <td>{guest.firstName}</td>
                            <td>{guest.lastName}</td>
                            <td>{guest.roomNumber}</td>
                            <td>{guest.status}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(guest.id)}>
                                    🔍
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuestList;
