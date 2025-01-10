import mongoose from 'mongoose';

const ourWorkProcessSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true
  },
  icon: {
    type: String,
    required: false
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

export const OurWorkProcess = mongoose.model('OurWorkProcess', ourWorkProcessSchema);
