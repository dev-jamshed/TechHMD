import mongoose from "mongoose";

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

export const FAQModel = mongoose.model('FAQ', schema);
