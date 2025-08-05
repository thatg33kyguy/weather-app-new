const express = require('express');
const router = express.Router();
const Weather = require('../schema/Weather');

// Route to post weather data
router.post('/', async (req, res) => {
  const weatherData = new Weather(req.body);
  try {
    await weatherData.save();
    res.status(201).send(weatherData);
  } catch (error) {
    console.error('Error saving weather data:', error);  // Log error to console
    res.status(400).send({ message: 'Error saving weather data', error });  // Send more detailed error message
  }
});


// Route to get weather data (example, can be customized as needed)
router.post('/', async (req, res) => {
  const weatherData = new Weather(req.body);
  try {
    await weatherData.save();
    res.status(201).send(weatherData);
  } catch (error) {
    console.error('Error saving weather data:', error);  // Log error to console
    res.status(400).send({ message: 'Error saving weather data', error });  // Send more detailed error message
  }
});


module.exports= router;
