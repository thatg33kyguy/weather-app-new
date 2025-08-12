// const express = require('express');
const express = require('express');
// const router = express.Router();

const router = express.Router();
const DailySummary = require('../schema/DailySummary');

// Route to get daily summaries for a specific city
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const summaries = await DailySummary.find({ city });
    console.log("PRINTING DAILY SUMMARY OF THE CITY "+ city)
    console.log(JSON.stringify(summaries));
    res.json(summaries);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Route to post a daily summary
router.post('/', async (req, res) => {
  try {
    console.log("Saving Daily Summary ")
    const summary = new DailySummary(req.body);
    await summary.save();
    res.status(201).json(summary);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;