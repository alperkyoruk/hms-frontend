// src/components/EditRoom.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./EditRoom.css";

const EditRoom = () => {
    const { roomNumber } = useParams();
    const [roomData, setRoomData] = useState({
        id: "",
        roomType: "",
        roomNumber: roomNumber,
        roomDescription: "",
        roomPrice: "",
        roomCapacity: "",
        roomStatus: "",
        bedType: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/rooms/getRoomByRoomNumber?roomNumber=${roomNumber}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                const room = response.data.data;
                setRoomData({
                    id: room.id,
                    roomType: room.roomType,
                    roomNumber: room.roomNumber,
                    roomDescription: room.roomDescription,
                    roomPrice: room.roomPrice,
                    roomCapacity: room.roomCapacity,
                    roomStatus: room.roomStatus,
                    bedType: room.bedType
                });
            }
        })
        .catch(error => console.error('Error fetching room details:', error));
    }, [roomNumber]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRoomData({
            ...roomData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        axios.post(`http://localhost:8080/api/rooms/updateRoom`, roomData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                navigate(`/rooms/${roomNumber}`);
            }
        })
        .catch(error => console.error('Error updating room:', error));
    };

    return (
        <div className="edit-room">
            <h2>Edit Room</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(roomData).map(([key, value]) => {
                    if (key === 'id' || key === 'roomNumber') return null; // Don’t allow editing the ID or room number

                    return (
                        <div className="form-group" key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="text"
                                name={key}
                                placeholder={value ? `Current: ${value}` : `No current value`}
                                value={roomData[key]}
                                onChange={handleInputChange}
                            />
                        </div>
                    );
                })}
                <button type="submit" className="submit-button">Save Changes</button>
            </form>
        </div>
    );
};

export default EditRoom;
