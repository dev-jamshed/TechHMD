import mongoose from 'mongoose';

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

// Model Creation
export const Service = mongoose.model('Service', schema);