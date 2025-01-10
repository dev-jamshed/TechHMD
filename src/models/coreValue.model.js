import mongoose from 'mongoose';

const coreValueSchema = new mongoose.Schema({
  image: {
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

export const CoreValue = mongoose.model('CoreValue', coreValueSchema);
