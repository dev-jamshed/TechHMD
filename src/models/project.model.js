const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    serviceID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("Project", schema);
module.exports = { ProjectModel };
