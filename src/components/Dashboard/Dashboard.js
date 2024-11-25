import React from 'react';
import DashboardMetrics from './DashboardMetrics'; // Import the new component
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <DashboardMetrics /> {/* Include the metrics component here */}
            {/* Add other dashboard components as needed */}
        </div>
    );
};

export default Dashboard;
