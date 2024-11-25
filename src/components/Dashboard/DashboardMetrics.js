import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './DashboardMetrics.css'; // Create a CSS file for styling

const DashboardMetrics = () => {
    const [metrics, setMetrics] = useState({
        occupancyRate: 0,
        guestCount: 0,
        availableRoomCount: 0,
    });

    useEffect(() => {
        const fetchMetrics = async () => {
            const token = Cookies.get('token');
            try {
                const response = await axios.get('http://localhost:8080/api/metrics/getMetrics', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setMetrics(response.data.data);
                }
            } catch (error) {
                console.error('Error fetching dashboard metrics:', error);
            }
        };
        fetchMetrics();
    }, []);

    return (
        <div className="dashboard-metrics">
            <h2>Dashboard Metrics</h2>
            <div className="metrics-container">
                <div className="metric-card">
                    <h3>Occupancy Rate</h3>
                    <p>{metrics.occupancyRate}%</p>
                </div>
                <div className="metric-card">
                    <h3>Guest Count</h3>
                    <p>{metrics.guestCount}</p>
                </div>
                <div className="metric-card">
                    <h3>Available Room Count</h3>
                    <p>{metrics.availableRoomCount}</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardMetrics;
