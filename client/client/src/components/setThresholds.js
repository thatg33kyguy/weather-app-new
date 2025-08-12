import React, { useState } from 'react';
import { setThresholds } from '../api';
import './setThreshold.css';

const SetThresholds = () => {
  const [city, setCity] = useState('');
  const [temperatureThreshold, setTemperatureThreshold] = useState('');
  const [weatherConditions, setWeatherConditions] = useState('');
  const [consecutiveUpdates, setConsecutiveUpdates] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const thresholds = {
      city,
      temperatureThreshold: parseFloat(temperatureThreshold),
      weatherConditions: weatherConditions.split(',').map(cond => cond.trim()),
      consecutiveUpdates: parseInt(consecutiveUpdates, 10)
    };

    try {
      await setThresholds(thresholds);
      setMessage('Thresholds set successfully');
    } catch (error) {
      setMessage('Error setting thresholds');
      console.error('Error setting thresholds:', error);
    }
  };

  return (
    <div className="set-thresholds-container">
      <h2 className="set-thresholds-heading">Set Thresholds for a City</h2>
      <form onSubmit={handleSubmit} className="set-thresholds-form">
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label>Temperature Threshold:</label>
          <input type="number" value={temperatureThreshold} onChange={(e) => setTemperatureThreshold(e.target.value)} required />
        </div>
        <div>
          <label>Weather Conditions (comma-separated):</label>
          <input type="text" value={weatherConditions} onChange={(e) => setWeatherConditions(e.target.value)} required />
        </div>
        <div>
          <label>Consecutive Updates:</label>
          <input type="number" value={consecutiveUpdates} onChange={(e) => setConsecutiveUpdates(e.target.value)} required />
        </div>
        <button type="submit" className="set-thresholds-button">Set Thresholds</button>
      </form>
      {message && <p className="set-thresholds-message">{message}</p>}
    </div>
  );
};

export default SetThresholds;
