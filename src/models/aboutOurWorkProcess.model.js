import mongoose from 'mongoose';

const aboutOurWorkProcessSchema = new mongoose.Schema({
  icon: {
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

export const AboutOurWorkProcess = mongoose.model('AboutOurWorkProcess', aboutOurWorkProcessSchema);
