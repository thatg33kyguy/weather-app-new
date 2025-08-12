const express = require('express');
const router = express.Router();
const DailySummary = require('./schema/DailySummary'); // keep PascalCase since it's a model

// GET all daily summaries
router.get('/', async (req, res) => {
  try {
    const summaries = await DailySummary.find().sort({ date: -1 });
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all daily summaries' });
  }
});

// GET daily summaries for a specific city
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const summaries = await DailySummary.find({ city }).sort({ date: -1 }).limit(7);
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching daily summaries' });
  }
});

// POST a new daily summary
router.post('/', async (req, res) => {
  try {
    console.log('Saving daily Summary:', req.body);

    if (!req.body.city || !req.body.date) {
      return res.status(400).json({ message: 'Missing required fields: city, date' });
    }

    const summary = new DailySummary(req.body);
    await summary.save();

    res.status(201).json(summary);
  } catch (error) {
    console.error('Error saving daily summary:', error);
    res.status(500).json({ message: 'Server error while saving summary' });
  }
});

module.exports = router;
