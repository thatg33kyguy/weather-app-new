import axios from 'axios';

// Read API base URL from environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// API calls
export const getDailySummaries = (city) =>
  axios.get(`${API_BASE_URL}/api/dailySummary/${city}`);

export const setThresholds = (thresholds) =>
  axios.post(`${API_BASE_URL}/api/alertThresholds`, thresholds);

export const getAlertThresholds = () =>
  axios.get(`${API_BASE_URL}/api/alertThresholds`);
