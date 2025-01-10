import mongoose from "mongoose";

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
      required: true,
    },
  },
  { timestamps: true }
);

export const AboutModel = mongoose.model("About", schema);
