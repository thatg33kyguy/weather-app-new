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
    res.status(400).send(error);
  }
});

// Route to get weather data (example, can be customized as needed)
router.get('/', async (req, res) => {
  try {
    const weatherData = await Weather.find();
    res.status(200).send(weatherData);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
