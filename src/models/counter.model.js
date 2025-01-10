import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const Counter = mongoose.model('Counter', counterSchema);