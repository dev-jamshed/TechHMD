import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  pageName: {
    type: String,
    required: true
  },
  metaTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  metaKeywords: [{ type: String, required: false }],
  pageContent: {
    type: String,
    required: true
  },
  organizationSchema: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export const PageMetaTags = mongoose.model('PageMetaTags', schema);
