// src/components/EditStaff.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./EditStaff.css";

const EditStaff = () => {
    const { email } = useParams();
    const [staffData, setStaffData] = useState({
        id: "",
        firstName: "",
        lastName: "",
        email: email,
        phoneNumber: "",
        position: "",
        department: "",
        status: "",
        badgeNumber: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/staff/getStaffByEmail?email=${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                const staff = response.data.data;
                setStaffData(staff);
            }
        })
        .catch(error => console.error('Error fetching staff details:', error));
    }, [email]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaffData({
            ...staffData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        axios.post(`http://localhost:8080/api/staff/updateStaff`, staffData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                navigate(`/staff`);
            }
        })
        .catch(error => console.error('Error updating staff:', error));
    };

    return (
        <div className="edit-staff">
            <h2>Edit Staff</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(staffData).map(([key, value]) => {
                    if (key === 'id') return null;

                    return (
                        <div className="form-group" key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="text"
                                name={key}
                                placeholder={value ? `Current: ${value}` : `No current value`}
                                value={staffData[key]}
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

export default EditStaff;
