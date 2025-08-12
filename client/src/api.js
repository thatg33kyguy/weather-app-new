import axios from 'axios';

<<<<<<< HEAD
// Read API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
=======
// const API_BASE_URL = 'http://localhost:8080'; 
const API_BASE_URL = 'https://weather-app-kebd.onrender.com';
>>>>>>> 5fc63aadee21548fc3021e9a674889187defaaa8

// API calls
export const getDailySummaries = (city) =>
  axios.get(`${API_BASE_URL}/api/dailySummary/${city}`);

export const setThresholds = (thresholds) =>
  axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds);

export const getAlertThresholds = () =>
  axios.get(`${API_BASE_URL}/api/alertThresholds`);
