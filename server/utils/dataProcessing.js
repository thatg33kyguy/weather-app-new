const axios = require('axios');
const weather = require('../schema/Weather')

require('dotenv').config();

const fetchStoredWeatherData = async () => {
    console.log("Fetching Stored Weather Data")
    try {
       const response = await axios.get('https://weather-app-kebd.onrender.com/api/weather');
        console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
      console.error('Error fetching stored weather data:', error);
      return [];
    }
  };

const fetchWeatherData = async () => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const apiKey = process.env.API_KEY // Replace with your OpenWeatherMap API key
  

  const weatherPromises = cities.map(city =>
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
  );
  
  try {
    const responses = await Promise.all(weatherPromises);
    console.log("Saving weather data ************")
    const WeatherData = responses.map(response => ({
      city: response.data.name,
      temp: response.data.main.temp,
      main: response.data.weather[0].main
    }));
    const saveWeatherData = responses.map(response =>({
        city:response.data.name,
        temp: response.data.main.temp,
        main: response.data.weather[0].main,
        feels_like:response.data.main.feels_like,
        dt:response.data.dt

    }))
    console.log("Saving weather data ************")
    console.log(saveWeatherData)
  await weather.insertMany(saveWeatherData);
 
  return WeatherData;
} catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};

const calculateDailySummary = (cityData) => {
    const temps = [];
    const conditions = [];
    
    // Extract temperature and weather conditions from the data
    cityData.forEach(entry => {
      temps.push(entry.temp);
      conditions.push(entry.main);
    });
  
    // Calculate the average temperature
    const avg_temp = temps.reduce((sum, temp) => sum + temp, 0) / temps.length;
  
    // Find the maximum and minimum temperatures
    const max_temp = Math.max(...temps);
    const min_temp = Math.min(...temps);
  
    // Determine the dominant weather condition
    const conditionCounts = conditions.reduce((acc, condition) => {
      acc[condition] = (acc[condition] || 0) + 1;
      return acc;
    }, {});
  
    const dominant_condition = Object.keys(conditionCounts).reduce((a, b) => 
      conditionCounts[a] > conditionCounts[b] ? a : b
    );
  
    // Return the summary
    return {
      city: cityData[0].city,
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      avg_temp,
      max_temp,
      min_temp,
      dominant_condition
    };
  };
  

module.exports = {
  fetchWeatherData,
  calculateDailySummary,
  fetchStoredWeatherData
};
