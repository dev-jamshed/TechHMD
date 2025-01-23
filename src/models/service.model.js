const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
    },
    logo: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    parentService: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
    },
    metaTitle: {
      type: String,
      trim: true,
    },
    metaDescription: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model('Service', schema);
module.exports = { Service };