import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8080'; // Adjust to your backend URL
const API_BASE_URL = 'https://weather-app-kebd.onrender.com';


export const getDailySummaries = (city) => axios.get(`${API_BASE_URL}/api/dailySummary/${city}`);
export const setThresholds = (thresholds) => axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds);
export const getAlertThresholds = () => axios.get(`${API_BASE_URL}/api/alertThresholds`);
// Removed the getTriggeredAlerts function
