// src/components/StaffDetails/StaffDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./StaffDetails.css";

const StaffDetails = () => {
    const { staffId } = useParams();
    const [staff, setStaff] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get('token');

        axios.get(`http://localhost:8080/api/staff/getById?staffId=${staffId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setStaff(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching staff details:', error));
    }, [staffId]);

    if (!staff) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/staff/edit/${staff.email}`);
    };


    return (
        <div className="staff-details">
            <h2>Staff Details</h2>
            <div className="details-card">
                <div className="details-row"><strong>First Name:</strong> {staff.firstName}</div>
                <div className="details-row"><strong>Last Name:</strong> {staff.lastName}</div>
                <div className="details-row"><strong>Email:</strong> {staff.email}</div>
                <div className="details-row"><strong>Phone Number:</strong> {staff.phoneNumber}</div>
                <div className="details-row"><strong>Position:</strong> {staff.position}</div>
                <div className="details-row"><strong>Department:</strong> {staff.department}</div>
                <div className="details-row"><strong>Status:</strong> {staff.status}</div>
                <div className="details-row"><strong>Badge Number:</strong> {staff.badgeNumber}</div>
                <button onClick={handleEditClick} className="edit-button">Edit Staff</button>
            </div>
        </div>
    );
};

export default StaffDetails;
