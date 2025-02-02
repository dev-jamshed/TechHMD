import mongoose from "mongoose";

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
    pageName: {
      type: String,
      required: false,
      trim: true,
    },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: false },
    media: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const AboutModel = mongoose.model("About", schema);