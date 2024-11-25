// src/components/EditFacility.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./EditFacility.css";

const EditFacility = () => {
    const { facilityId } = useParams();
    const [facilityData, setFacilityData] = useState({
        id: facilityId,
        facilityName: "",
        facilityDescription: "",
        facilityPrice: "",
        facilityCapacity: "",
        facilityStatus: "",
        facilityType: "",
        reservationRequired: false,
        location: "",
        openingHours: "",
        closingHours: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/facilities/getFacilityById?facilityId=${facilityId}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                const facility = response.data.data;
                setFacilityData({
                    ...facility,
                    reservationRequired: facility.reservationRequired
                });
            }
        })
        .catch(error => console.error('Error fetching facility details:', error));
    }, [facilityId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFacilityData({
            ...facilityData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        axios.post(`http://localhost:8080/api/facilities/updateFacility`, facilityData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                navigate(`/facilities/${facilityId}`);
            }
        })
        .catch(error => console.error('Error updating facility:', error));
    };

    return (
        <div className="edit-facility">
            <h2>Edit Facility</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(facilityData).map(([key, value]) => {
                    if (key === 'id') return null; // Don’t allow editing the facility ID
                    
                    return (
                        <div className="form-group" key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type={typeof value === "boolean" ? "checkbox" : "text"}
                                name={key}
                                checked={typeof value === "boolean" ? value : undefined}
                                placeholder={typeof value === "boolean" ? "" : (value ? `Current: ${value}` : `No current value`)}
                                value={typeof value === "boolean" ? undefined : value}
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

export default EditFacility;
