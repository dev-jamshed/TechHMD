const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    required: false, 
  },
}, { timestamps: true });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

module.exports = { Testimonial };
