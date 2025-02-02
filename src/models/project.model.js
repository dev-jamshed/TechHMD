import mongoose from "mongoose";

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
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model("Project", schema);
