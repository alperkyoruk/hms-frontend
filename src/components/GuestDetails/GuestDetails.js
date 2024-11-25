import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./GuestDetails.css";

const GuestDetails = () => {
    const { guestId } = useParams();
    const [guest, setGuest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/guests/getGuestById?guestId=${guestId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.success) {
                    setGuest(response.data.data);
                }
            })
            .catch(error => console.error('Error fetching guest details:', error));
    }, [guestId]);

    if (!guest) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/guests/edit/${guest.email}`);
    };

    return (
        <div className="guest-details">
            <h2>Guest Details</h2>
            <div className="details-card">
                <div className="details-row"><strong>Full Name:</strong> {guest.firstName} {guest.lastName}</div>
                <div className="details-row"><strong>Date of Birth:</strong> {guest.dateOfBirth}</div>
                <div className="details-row"><strong>Sex:</strong> {guest.sex}</div>
                <div className="details-row"><strong>Phone Number:</strong> {guest.phoneNumber}</div>
                <div className="details-row"><strong>Email:</strong> {guest.email}</div>
                <div className="details-row"><strong>Passport Number:</strong> {guest.passportNumber}</div>
                <div className="details-row"><strong>Check-In Date:</strong> {guest.checkInDate}</div>
                <div className="details-row"><strong>Check-Out Date:</strong> {guest.checkOutDate}</div>
                <div className="details-row"><strong>VIP Status:</strong> {guest.vipStatus}</div>
                <div className="details-row"><strong>Room Number:</strong> {guest.room.roomNumber}</div>
                <div className="details-row"><strong>Room Type:</strong> {guest.room.roomType}</div>
                <div className="details-row"><strong>Room Description:</strong> {guest.room.roomDescription}</div>
                <div className="details-row"><strong>Room Status:</strong> {guest.room.roomStatus}</div>
                <button onClick={handleEditClick} className="edit-button">Edit Guest</button>
            </div>
        </div>
    );
};

export default GuestDetails;
