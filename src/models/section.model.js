const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
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
      required: true,
    },
  },
  { timestamps: true }
);

const HomeModel = mongoose.model("Home", schema);
module.exports = { HomeModel };
