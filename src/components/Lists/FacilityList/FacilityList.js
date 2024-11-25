// src/components/Lists/FacilityList/FacilityList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './FacilityList.css';

const FacilityList = () => {
    const [facilities, setFacilities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        axios.get('http://localhost:8080/api/facilities/getFacilities', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setFacilities(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching facilities:', error));
    }, []);

    const handleDetailsClick = (facilityId) => {
        navigate(`/facilities/${facilityId}`);
    };

    return (
        <div className="list-container">
            <h3>Facility List</h3>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Usage Count</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {facilities.map(facility => (
                        <tr key={facility.id}>
                            <td>{facility.facilityName}</td>
                            <td>{facility.facilityDescription}</td>
                            <td>{facility.usageCount}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(facility.id)}>
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

export default FacilityList;
