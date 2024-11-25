// src/components/RoomDetails/RoomDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./RoomDetails.css";

const RoomDetails = () => {
    const { roomNumber } = useParams();
    const [room, setRoom] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get('token');

        axios.get(`http://localhost:8080/api/rooms/getRoomByRoomNumber?roomNumber=${roomNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setRoom(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching room details:', error));
    }, [roomNumber]);

    if (!room) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/rooms/edit/${roomNumber}`);
    };

    return (
        <div className="room-details">
            <h2>Room Details</h2>
            <div className="details-card">
                <div className="details-row"><strong>Room Type:</strong> {room.roomType}</div>
                <div className="details-row"><strong>Room Number:</strong> {room.roomNumber}</div>
                <div className="details-row"><strong>Description:</strong> {room.roomDescription}</div>
                <div className="details-row"><strong>Price:</strong> ${room.roomPrice}</div>
                <div className="details-row"><strong>Capacity:</strong> {room.roomCapacity}</div>
                <div className="details-row"><strong>Status:</strong> {room.roomStatus}</div>
                <div className="details-row"><strong>Bed Type:</strong> {room.bedType}</div>
                <button onClick={handleEditClick} className="edit-button">Edit Room</button>
            </div>
        </div>
    );
};

export default RoomDetails;
