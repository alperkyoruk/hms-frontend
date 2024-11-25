// src/components/Lists/RoomList/RoomList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './RoomList.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        axios.get('http://localhost:8080/api/rooms/getRooms', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setRooms(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching rooms:', error));
    }, []);

    const handleDetailsClick = (roomNumber) => {
        navigate(`/rooms/${roomNumber}`);
    };

    return (
        <div className="list-container">
            <h3>Room List</h3>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Room Number</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td>{room.roomNumber}</td>
                            <td>{room.roomType}</td>
                            <td>{room.roomStatus}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(room.roomNumber)}>
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

export default RoomList;
