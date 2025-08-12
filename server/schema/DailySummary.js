const mongoose = require('mongoose');

const dailySummarySchema = new mongoose.Schema({
  city: String,
  date: { type: Date, required: true },
  avg_temp: Number,
  max_temp: Number,
  min_temp: Number,
  dominant_condition: String
});

const dailySummary = mongoose.model('dailySummary', dailySummarySchema);

module.exports = dailySummary;
