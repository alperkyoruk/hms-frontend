// src/components/FacilityDetails/FacilityDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./FacilityDetails.css";



const FacilityDetails = () => {
    const { facilityId } = useParams();
    const [facility, setFacility] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const token = Cookies.get('token');

        axios.get(`http://localhost:8080/api/facilities/getFacilityById?facilityId=${facilityId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setFacility(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching facility details:', error));
    }, [facilityId]);

    if (!facility) {
        return <div>Loading...</div>;
    }

    const handleEditClick = () => {
        navigate(`/facilities/edit/${facility.id}`);
    };

    return (
        <div className="facility-details">
            <h2>Facility Details</h2>
            <div className="details-card">
                <div className="details-row"><strong>Name:</strong> {facility.facilityName}</div>
                <div className="details-row"><strong>Description:</strong> {facility.facilityDescription}</div>
                <div className="details-row"><strong>Price:</strong> ${facility.facilityPrice}</div>
                <div className="details-row"><strong>Capacity:</strong> {facility.facilityCapacity}</div>
                <div className="details-row"><strong>Status:</strong> {facility.facilityStatus}</div>
                <div className="details-row"><strong>Type:</strong> {facility.facilityType}</div>
                <div className="details-row"><strong>Reservation Required:</strong> {facility.reservationRequired ? 'Yes' : 'No'}</div>
                <div className="details-row"><strong>Location:</strong> {facility.location}</div>
                <div className="details-row"><strong>Opening Hours:</strong> {facility.openingHours}</div>
                <div className="details-row"><strong>Closing Hours:</strong> {facility.closingHours}</div>
                <div className="details-row"><strong>Usage Count:</strong> {facility.usageCount}</div>
                <button onClick={handleEditClick} className="edit-button">Edit Facility</button>
            </div>
        </div>
    );
};

export default FacilityDetails;
