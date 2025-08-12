const mongoose = require('mongoose');
// const express = require('express');
// const router = express.Router();


const alertThresholdSchema = new mongoose.Schema({
  city: String,
  temperatureThreshold: Number, // Temperature in Celsius
  weatherConditions: [String], // List of weather conditions that should trigger an alert
  consecutiveUpdates: Number // Number of consecutive updates to check
});

const AlertThreshold = mongoose.model('AlertThreshold', alertThresholdSchema);

module.exports = AlertThreshold;
