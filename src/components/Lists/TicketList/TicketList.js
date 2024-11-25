// src/components/Lists/TicketList/TicketList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './TicketList.css';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        axios.get('http://localhost:8080/api/tickets/getTickets', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setTickets(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching tickets:', error));
    }, []);

    const handleDetailsClick = (ticketId) => {
        navigate(`/tickets/${ticketId}`);
    };

    return (
        <div className="list-container">
            <h3>Ticket List</h3>
            <table className="list-table">
                <thead>
                    <tr>
                        <th>Issue</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Room Number</th>
                        <th>Assigned Staff</th>
                        <th>Ticket Number</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket.id}>
                            <td>{ticket.issue}</td>
                            <td>{ticket.category}</td>
                            <td>{ticket.status}</td>
                            <td>{ticket.roomNumber}</td>
                            <td>{ticket.assignedStaff.firstName} {ticket.assignedStaff.lastName}</td>
                            <td>{ticket.ticketNumber}</td>
                            <td>
                                <button onClick={() => handleDetailsClick(ticket.ticketNumber)}>
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

export default TicketList;
