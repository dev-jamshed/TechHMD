const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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

const Client = mongoose.model('Client', clientSchema);
module.exports = { Client };
