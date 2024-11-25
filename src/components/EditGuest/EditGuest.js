import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./EditGuest.css";

const EditGuest = () => {
    const { email } = useParams();
    const [guestData, setGuestData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        sex: "",
        phoneNumber: "",
        email: email,
        passportNumber: "",
        checkInDate: "",
        checkOutDate: "",
        vipStatus: "",
        loyaltyCardNumber: "",
        roomNumber: "",
        reservationNumber: "",
        status: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/guests/getGuestByEmail?email=${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                const guest = response.data.data;
                setGuestData({
                    id: guest.id,
                    firstName: guest.firstName,
                    lastName: guest.lastName,
                    dateOfBirth: guest.dateOfBirth ? guest.dateOfBirth.split('T')[0] : "",
                    sex: guest.sex,
                    phoneNumber: guest.phoneNumber,
                    email: guest.email,
                    passportNumber: guest.passportNumber,
                    checkInDate: guest.checkInDate ? guest.checkInDate.split('.')[0] : "",
                    checkOutDate: guest.checkOutDate ? guest.checkOutDate.split('.')[0] : "",
                    vipStatus: guest.vipStatus,
                    loyaltyCardNumber: guest.loyaltyCardNumber,
                    roomNumber: guest.roomNumber,
                    reservationNumber: guest.reservationNumber,
                    status: guest.status
                });
            }
        })
        .catch(error => console.error('Error fetching guest details:', error));
    }, [email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGuestData({
            ...guestData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        axios.post(`http://localhost:8080/api/guests/updateGuest`, guestData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                navigate(`/guests`);
            }
        })
        .catch(error => console.error('Error updating guest:', error));
    };

    return (
        <div className="edit-guest">
            <h2>Edit Guest</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(guestData).map(([key, value]) => {
                    // Skipping the 'id' field
                    if (key === 'id') return null;

                    return (
                        <div className="form-group" key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type={key.includes('Date') ? "date" : "text"}
                                name={key}
                                placeholder={value ? `Current: ${value}` : `No current value`}
                                value={guestData[key]}
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

export default EditGuest;
