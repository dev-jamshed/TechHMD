import mongoose from 'mongoose';

const heroSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: String, required: false },
    buttonText: { type: String, required: false },
    buttonLink: { type: String, required: false },
    pageName: { type: String, required: false },
    serviceId: { type: String, required: false }
  },
  { timestamps: true } 
);

export const HeroSection = mongoose.model('HeroSection', heroSectionSchema);
