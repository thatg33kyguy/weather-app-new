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

// Route to get weather by city
router.get('/:city', async (req, res) => {
  const city = req.params.city.toLowerCase();

  try {
    const weatherData = await Weather.findOne({ city: { $regex: new RegExp(`^${city}$`, 'i') } });

    if (!weatherData) {
      return res.status(404).json({ error: 'Weather data not found for this city' });
    }

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/api/weather/:city', async (req, res) => {
  try {
    const cityName = req.params.city.toLowerCase();
    const weatherData = await Weather.findOne({ city: cityName });

    if (!weatherData) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(weatherData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;