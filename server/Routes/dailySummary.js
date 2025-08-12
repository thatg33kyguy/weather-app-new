






// module.exports = router;
const express = require('express');
const router = express.Router();
const dailySummary = require('../schema/dailySummary');

// Utility: Escape RegExp characters to avoid injection or invalid patterns
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


router.get('/', async (req, res) => {
  try {
    const summaries = await dailySummary.find().sort({ date: -1 });
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all daily summaries' });
  }
});

// GET all daily summaries for a specific city (case-insensitive)
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const summaries = await dailySummary.find({ city }).sort({ date: -1 }).limit(7); // e.g., last 7 days
    res.status(200).json(summaries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching daily summaries' });
  }
});



// POST a new daily summary
router.post('/', async (req, res) => {
  try {
    console.log('Saving Daily Summary:', req.body);

    // Optional: Validate required fields if you have a schema
    if (!req.body.city || !req.body.date ) {
      return res.status(400).json({ message: 'Missing required fields: city, date' });
    }

    const summary = new dailySummary(req.body);
    await summary.save();

    res.status(201).json(summary);
  } catch (error) {
    console.error('Error saving daily summary:', error);
    res.status(500).json({ message: 'Server error while saving summary' });
  }
});

module.exports = router;
