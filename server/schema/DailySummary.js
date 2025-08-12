const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
  city: String,
  date: { type: Date, required: true },
  avg_temp: Number,
  max_temp: Number,
  min_temp: Number,
  dominant_condition: String
});

const DailySummary = mongoose.model('DailySummary', dailySummarySchema);

module.exports = DailySummary;


//latest commit