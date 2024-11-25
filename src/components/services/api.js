// services/api.js
import axios from 'axios';
import Cookies from 'js-cookie';
//use bearer token from cookies
const token = Cookies.get('token');
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };

const API_URL = 'http://localhost:8080'; // Update with your API URL

export const fetchDashboardData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/rooms/getRooms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
