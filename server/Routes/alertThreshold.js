const express = require('express');
const router = express.Router();
const AlertThreshold = require('../schema/alertThreshold');

// Route to get thresholds for a city
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const thresholds = await AlertThreshold.findOne({ city });
    res.json(thresholds);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to update thresholds
router.put('/', async (req, res) => {
  try {
    const { city, temperatureThreshold, weatherConditions, consecutiveUpdates } = req.body;
    const thresholds = await AlertThreshold.findOneAndUpdate(
      { city },
      { temperatureThreshold, weatherConditions, consecutiveUpdates },
      { upsert: true, new: true }
    );
    res.json(thresholds);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

router.post('/', async (req, res) => {
    try {
      const { city, temperatureThreshold, weatherConditions, consecutiveUpdates } = req.body;
      const newThreshold = new AlertThreshold({ city, temperatureThreshold, weatherConditions, consecutiveUpdates });
      await newThreshold.save();
      console.log("Saving new threshold")
      res.status(201).json(newThreshold);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });


module.exports = router;
