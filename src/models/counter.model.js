const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Counter = mongoose.model('Counter', counterSchema);
module.exports = { Counter };