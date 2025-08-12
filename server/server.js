
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const weatherRouter = require('./Routes/weather');
const schedule = require('node-schedule');
const dailySummaryRouter = require('./Routes/dailySummary');
const { fetchWeatherData, fetchStoredWeatherData, calculateDailySummary } = require('./utils/dataProcessing');
const { checkAlertsAndNotify} = require('./utils/alert')
const alertThresholdRouter = require('./Routes/alertThreshold'); 
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
// // app.use(cors());
// const cors = require('cors');
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

require('dotenv').config();

// MongoDB Atlas connection
const uri = process.env.MONGO_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });





app.use('/api/weather', weatherRouter);
app.use('/api/dailySummary', dailySummaryRouter);
app.use('/api/alertThresholds', alertThresholdRouter);

const checkWeatherAndAlerts = async () => {
    const weatherData = await fetchWeatherData();
    await checkAlertsAndNotify(weatherData);
  };

module.exports = app 

if (require.main === module) {
    const port = process.env.PORT || 8080;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }

const fetchAndStoreDailySummaries = async () => {
    const weatherData = await fetchStoredWeatherData()
    //console.log(JSON.stringify(weatherData));
    if (!Array.isArray(weatherData)) {
        console.error('Weather data is not an array');
        return;
      }


      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const twentyFourHoursAgo = now - 24 * 60 * 60; // 24 hours ago in seconds
    
      // Filter weather data to include only entries from the past 24 hours
      const filteredWeatherData = weatherData.filter(data => data.dt >= twentyFourHoursAgo);


    
    const cityGroupedData = filteredWeatherData.reduce((acc, data) => {
      if (!acc[data.city]) acc[data.city] = [];
      acc[data.city].push(data);
      return acc;
    }, {});
  
    for (const [city, data] of Object.entries(cityGroupedData)) {
      const dailySummary = calculateDailySummary(data);
      try {
        await axios.post('http://localhost:8080/api/dailySummary', dailySummary);
      } catch (error) {
        console.error(`Failed to store daily summary for ${city}:`, error);
      }
    }
  };
  

schedule.scheduleJob('0 */2 * * *', checkWeatherAndAlerts);
  // Schedule the job to run daily at midnight

schedule.scheduleJob('0 0 * * *', async () => {
    await fetchAndStoreDailySummaries();
});













