const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema);
module.exports = { PrivacyPolicy };
