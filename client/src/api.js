// import axios from 'axios';

// // const API_BASE_URL = 'http://localhost:8080'; // Adjust to your backend URL
// // src/api.js
// export const API_BASE_URL = "https://weather-application-fvue.onrender.com"

// export const getDailySummaries = (city) => axios.get(`${API_BASE_URL}/api/dailySummary/${city}`);
// export const setThresholds = (thresholds) => axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds);
// export const getAlertThresholds = () => axios.get(`${API_BASE_URL}/api/alertThresholds`);
// // Removed the getTriggeredAlerts function

// src/api.js
import axios from 'axios';

// Use environment variable, fallback to localhost for development
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

export const getDailySummaries = (city) => axios.get(`${API_BASE_URL}/api/dailySummary/${city}`);
export const setThresholds = (thresholds) => axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds);
export const getAlertThresholds = () => axios.get(`${API_BASE_URL}/api/alertThresholds`);
