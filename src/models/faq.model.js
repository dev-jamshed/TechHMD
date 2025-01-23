const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true,
    },
    answer: {
        type: String,
        required: true,
        trim: true,
    },
},{
    timestamps :true
});

const FAQModel = mongoose.model('FAQ', schema);
module.exports = { FAQModel };
