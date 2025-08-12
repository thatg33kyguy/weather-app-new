import axios from 'axios';

// Read API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
<<<<<<< HEAD
=======
=======
// const API_BASE_URL = 'http://localhost:8080'; 

>>>>>>> e7cce86749cace6d00bc9a0a84e3403b3dad8d18

// API calls
export const getDailySummaries = (city) =>
  axios.get(`${API_BASE_URL}/api/dailySummary/${city}`);

export const setThresholds = (thresholds) =>
  axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds);

export const getAlertThresholds = () =>
  axios.get(`${API_BASE_URL}/api/alertThresholds`);
