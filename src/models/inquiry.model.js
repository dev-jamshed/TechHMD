const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: 'Service',
    },
    ServiceId: {
      type: mongoose.Types.ObjectId,
      ref: 'Service',
    },
  },
  {
    timestamps: true,
  }
);

const InquiryModel = mongoose.model('Inquiry', schema);
module.exports = { InquiryModel };
