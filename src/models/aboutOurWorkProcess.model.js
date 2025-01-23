const mongoose = require('mongoose');

const aboutOurWorkProcessSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const AboutOurWorkProcess = mongoose.model('AboutOurWorkProcess', aboutOurWorkProcessSchema);
module.exports = { AboutOurWorkProcess };
