const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  main: { type: String, required: true },
  temp: { type: Number, required: true },
  feels_like: { type: Number, required: true },
  dt: { type: Number, required: true }
});

const Weather = mongoose.model('Weather', weatherSchema);

module.exports = Weather;
