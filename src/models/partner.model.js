const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    website_url: {
        type: String,
        required: false,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const Partner = mongoose.model('Partner', partnerSchema);
module.exports = { Partner };
