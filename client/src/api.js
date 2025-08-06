import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';
// const API_BASE_URL = 'https://weather-app-kebd.onrender.com';

export const getDailySummaries = (city) =>
  axios.get(`${API_BASE_URL}/api/dailySummary/${city}`, { withCredentials: true });

export const setThresholds = (thresholds) =>
  axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds, { withCredentials: true });

export const getAlertThresholds = () =>
  axios.get(`${API_BASE_URL}/api/alertThresholds`, { withCredentials: true });
