const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
        price: { type: String, required: true },
        features: { type: [String], required: true }, // Add features field as an array
        description: { type: String, required: false },
    },
    { timestamps: true }
);

const PackageModel = mongoose.model('Package', schema);
module.exports = { PackageModel };
