import mongoose from 'mongoose';

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

export const PrimaryBanner = mongoose.model('PrimaryBanner', primaryBannerSchema);