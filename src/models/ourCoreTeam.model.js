import mongoose from "mongoose";

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    linkedin_url: {
        type: String,
        required: false,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

export const OurCoreTeam = mongoose.model('OurCoreTeam', schema);
