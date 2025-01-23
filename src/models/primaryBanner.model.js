const mongoose = require('mongoose');

const primaryBannerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    primaryImage: {
        type: String,
        required: true
    },
    secondaryImage: {
        type: String,
        default: null
    },
    pageName: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

const PrimaryBanner = mongoose.model('PrimaryBanner', primaryBannerSchema);
module.exports = { PrimaryBanner };