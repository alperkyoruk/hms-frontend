// src/components/TicketDetails/TicketDetails.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";
import "./TicketDetails.css";

const TicketDetails = () => {
    const { ticketNumber } = useParams();
    const [ticket, setTicket] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        axios.get(`http://localhost:8080/api/tickets/getTicketByTicketNumber?ticketNumber=${ticketNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.data.success) {
                setTicket(response.data.data);
            }
        })
        .catch(error => console.error('Error fetching ticket details:', error));
    }, [ticketNumber]);

    if (!ticket) {
        return <div>Loading...</div>;
    }

    
    const handleEditClick = () => {
        navigate(`/tickets/edit/${ticket.ticketNumber}`);
    };

    return (
        <div className="ticket-details">
            <h2>Ticket Details</h2>
            <div className="details-card">
                <div className="details-row"><strong>Issue:</strong> {ticket.issue}</div>
                <div className="details-row"><strong>Ticket Number:</strong> {ticket.ticketNumber}</div>
                <div className="details-row"><strong>Status:</strong> {ticket.status}</div>
                <div className="details-row"><strong>Category:</strong> {ticket.category}</div>
                <div className="details-row"><strong>Created Date:</strong> {new Date(ticket.createdDate).toLocaleString()}</div>
                <div className="details-row"><strong>Resolved Date:</strong> {new Date(ticket.resolvedDate).toLocaleString()}</div>
                <div className="details-row"><strong>Description:</strong> {ticket.description}</div>
                <div className="details-row"><strong>Comment:</strong> {ticket.comment}</div>
                <div className="details-row"><strong>Guest ID:</strong> {ticket.guestId}</div>
                <div className="details-row"><strong>Assigned Staff:</strong> {ticket.assignedStaff.firstName} {ticket.assignedStaff.lastName}</div>
                <div className="details-row"><strong>Room Number:</strong> {ticket.roomNumber}</div>
                <button onClick={handleEditClick} className="edit-button">Edit Ticket</button>
            </div>
        </div>
    );
};

export default TicketDetails;
