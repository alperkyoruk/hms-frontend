// src/App.js (updated routes for adding edit functionality)

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Importing components
import Login from './components/Login/Login.js';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard/Dashboard.js';
import Navbar from './components/Navbar/Navbar.js';
import GuestList from './components/Lists/GuestList/GuestList.js';
import EditGuest from './components/EditGuest/EditGuest.js';
import GuestDetails from './components/GuestDetails/GuestDetails.js';
import StaffList from './components/Lists/StaffList/StaffList.js';
import EditStaff from './components/EditStaff/EditStaff.js';
import RoomList from './components/Lists/RoomList/RoomList.js';
import RoomDetails from './components/RoomDetails/RoomDetails.js';
import EditRoom from './components/EditRoom/EditRoom.js';
import FacilityList from './components/Lists/FacilityList/FacilityList.js';
import FacilityDetails from './components/FacilityDetails/FacilityDetails.js';
import EditFacility from './components/EditFacility/EditFacility.js';
import TicketList from './components/Lists/TicketList/TicketList.js';
import TicketDetails from './components/TicketDetails/TicketDetails.js';
import EditTicket from './components/EditTicket/EditTicket.js';
import StaffDetails from './components/StaffDetails/StaffDetails.js';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route path="/dashboard" element={<ProtectedRoute><Navbar /><Dashboard /></ProtectedRoute>} />

                    <Route path="/guests" element={<ProtectedRoute><Navbar /><GuestList /></ProtectedRoute>} />
                    <Route path="/guests/edit/:email" element={<ProtectedRoute><Navbar /><EditGuest /></ProtectedRoute>} />
                    <Route path="/guests/:guestId" element={<ProtectedRoute><Navbar /><GuestDetails /></ProtectedRoute>} />

                    <Route path="/staff" element={<ProtectedRoute><Navbar /><StaffList /></ProtectedRoute>} />
                    <Route path="/staff/edit/:email" element={<ProtectedRoute><Navbar /><EditStaff /></ProtectedRoute>} />
                    <Route path="/staff/:staffId" element={<ProtectedRoute><Navbar /><StaffDetails /></ProtectedRoute>} />

                    <Route path="/rooms" element={<ProtectedRoute><Navbar /><RoomList /></ProtectedRoute>} />
                    <Route path="/rooms/edit/:roomNumber" element={<ProtectedRoute><Navbar /><EditRoom /></ProtectedRoute>} />
                    <Route path="/rooms/:roomNumber" element={<ProtectedRoute><Navbar /><RoomDetails /></ProtectedRoute>} />

                    <Route path="/facilities" element={<ProtectedRoute><Navbar /><FacilityList /></ProtectedRoute>} />
                    <Route path="/facilities/edit/:facilityId" element={<ProtectedRoute><Navbar /><EditFacility /></ProtectedRoute>} />
                    <Route path="/facilities/:facilityId" element={<ProtectedRoute><Navbar /><FacilityDetails /></ProtectedRoute>} />

                    <Route path="/tickets" element={<ProtectedRoute><Navbar /><TicketList /></ProtectedRoute>} />
                    <Route path="/tickets/edit/:ticketNumber" element={<ProtectedRoute><Navbar /><EditTicket /></ProtectedRoute>} />
                    <Route path="/tickets/:ticketNumber" element={<ProtectedRoute><Navbar /><TicketDetails /></ProtectedRoute>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
