const mongoose = require('mongoose');

const innovationItemSchema = new mongoose.Schema({
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
});

const innovationSchema = new mongoose.Schema({
    title_1: {
        type: String,
        default: null
    },
    title_2: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    innovations: [innovationItemSchema]
}, {
    timestamps: true
});

const Innovation = mongoose.model('Innovation', innovationSchema);
module.exports = { Innovation };
