// src/components/EditTicket.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./EditTicket.css";

const EditTicket = () => {
    const { ticketNumber } = useParams();
    const [ticketData, setTicketData] = useState({
        ticketNumber: ticketNumber,
        issue: "",
        description: "",
        status: "",
        category: "",
        roomNumber: "",
        assignedStaffId: "",
        guestId: ""
    });

    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        axios.get(`http://localhost:8080/api/tickets/getTicketByTicketNumber?ticketNumber=${ticketNumber}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                const ticket = response.data.data;
                setTicketData({
                    ...ticketData,
                    issue: ticket.issue,
                    description: ticket.description,
                    status: ticket.status,
                    category: ticket.category,
                    roomNumber: ticket.roomNumber,
                    assignedStaffId: ticket.assignedStaff.id,
                    guestId: ticket.guestId
                });
            }
        })
        .catch(error => console.error('Error fetching ticket details:', error));
    }, [ticketNumber]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTicketData({
            ...ticketData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = Cookies.get('token');

        axios.post(`http://localhost:8080/api/tickets/updateTicket`, ticketData, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            if (response.data.success) {
                navigate(`/tickets/${ticketNumber}`);
            }
        })
        .catch(error => console.error('Error updating ticket:', error));
    };

    return (
        <div className="edit-ticket">
            <h2>Edit Ticket</h2>
            <form onSubmit={handleSubmit}>
                {Object.entries(ticketData).map(([key, value]) => {
                    if (key === 'ticketNumber') return null; // Don’t allow editing the ticket number

                    return (
                        <div className="form-group" key={key}>
                            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                            <input
                                type="text"
                                name={key}
                                placeholder={value ? `Current: ${value}` : `No current value`}
                                value={ticketData[key]}
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

export default EditTicket;
