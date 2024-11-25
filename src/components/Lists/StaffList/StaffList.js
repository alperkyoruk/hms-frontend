// src/components/Lists/StaffList/StaffList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './StaffList.css';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        
        axios.get('http://localhost:8080/api/staff/getAllStaff', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setStaff(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching staff:', error));
    }, []);

    const handleDetailsClick = (staffId) => {
        navigate(`/staff/${staffId}`);
    };

    return (
        <div className="list-container">
            <h3>Staff List</h3>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Badge Number</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map(staffMember => (
                        <tr key={staffMember.id}>
                            <td>{staffMember.firstName}</td>
                            <td>{staffMember.lastName}</td>
                            <td>{staffMember.badgeNumber}</td>
                            <td>{staffMember.department}</td>
                            <td>{staffMember.position}</td>
                            <td>{staffMember.status}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(staffMember.id)}>
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

export default StaffList;
