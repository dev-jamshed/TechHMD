const mongoose = require('mongoose');

const trafficSchema = new mongoose.Schema({
  ip: String,
  country: String,
  page: String,
  timestamp: { type: Date, default: Date.now },
});

const Traffic = mongoose.model('Traffic', trafficSchema);

module.exports = Traffic;
