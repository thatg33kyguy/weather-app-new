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


// const Weather = require('./schema/Weather');
// const DailySummary = require('../schema/dailySummary');


const app = express();
app.use(bodyParser.json());
// In Express backend
// const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:8080',
}));

require('dotenv').config();

// MongoDB Atlas connection
const uri = process.env.MONGO_URI
mongoose.connect(uri).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));





app.use('/api/weather', weatherRouter);
app.use('/api/dailySummary', dailySummaryRouter);
app.use('/api/alertThresholds', alertThresholdRouter);

const checkWeatherAndAlerts = async () => {
    const weatherData = await fetchWeatherData();
    await checkAlertsAndNotify(weatherData);
  };
    //NEWLY ADDED//
  app.get('/', (req, res) => {
  res.send('🌦️ Weather API is running!');
});

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
  
// // Schedule the job to run at every 5 mintues
// schedule.scheduleJob('*/5 * * * *', checkWeatherAndAlerts);

schedule.scheduleJob('0 */2 * * *', checkWeatherAndAlerts);
  // Schedule the job to run daily at midnight

schedule.scheduleJob('0 0 * * *', async () => {
    await fetchAndStoreDailySummaries();
});
// schedule.scheduleJob('* * * * *', async () => {
//     await fetchAndStoreDailySummaries();
// });
















// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const axios = require('axios');
// // const cron = require('node-cron');
// const cors = require('cors');

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB schema
// const weatherSchema = new mongoose.Schema({
//   city: String,
//   temperature: Number,
//   description: String,
//   timestamp: { type: Date, default: Date.now }
// });

// const Weather = mongoose.model('Weather', weatherSchema);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // List of cities
// const cities = [
//   { name: 'Delhi', id: 1273294 },
//   { name: 'Mumbai', id: 1275339 },
//   { name: 'Kolkata', id: 1275004 },
//   { name: 'Bangalore', id: 1277333 },
//   { name: 'Hyderabad', id: 1269843 },
//   { name: 'Chennai', id: 1264527 }
// ];

// // Fetch and store weather data for all cities
// async function fetchAndStoreWeather() {
//   const apiKey = process.env.API_KEY;

//   for (const city of cities) {
//     try {
//       const response = await axios.get(
//         `https://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${apiKey}&units=metric`
//       );

//       const weatherData = new Weather({
//         city: city.name,
//         temperature: response.data.main.temp,
//         description: response.data.weather[0].description
//       });

//       await weatherData.save();
//       console.log(`Saved weather data for ${city.name}`);
//     } catch (error) {
//       console.error(`Error fetching weather for ${city.name}:`, error.message);
//     }
//   }
// }

// // Schedule to run every 5 minutes
// // cron.schedule('*/5 * * * *', () => {
// //   console.log('Fetching weather data...');
// //   fetchAndStoreWeather();
// // });

// // Route to get latest weather data (most recent per city)
// app.get('/weather', async (req, res) => {
//   try {
//     const allCitiesWeather = await Promise.all(
//       cities.map(async city => {
//         return await Weather.findOne({ city: city.name }).sort({ timestamp: -1 });
//       })
//     );

//     const filtered = allCitiesWeather.filter(Boolean);
//     res.json(filtered);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve weather data' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
