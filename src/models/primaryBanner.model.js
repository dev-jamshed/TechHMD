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
        required: false,
        trim: true
    },

    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: false },
}, {
    timestamps: true
});

export const PrimaryBanner = mongoose.model('PrimaryBanner', primaryBannerSchema);