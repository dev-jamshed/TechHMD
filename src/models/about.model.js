const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    type: {
      type: String, 
      unique: true,
      required: true,
      trim: true,
    },
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const AboutModel = mongoose.model("About", schema);
module.exports = { AboutModel };
