import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    headerLogo: { type: String, required: true },
    footerLogo: { type: String, required: true },
    description: { type: String, required: true },
    slogan: { type: String, required: false },
    sloganDescription: { type: String, required: false },

    phone1: { type: String, required: true },
    phone2: { type: String, required: true },

    email1: { type: String, required: true },
    email2: { type: String, required: true },


    address: { type: String, required: true },
    socialMedia: {
      facebook: { type: String, required: false },
      twitter: { type: String, required: false },
      instagram: { type: String, required: false },
      linkedin: { type: String, required: false },
      youtube: { type: String, required: false },
    },

    seo: {
      metaTitle: { type: String, required: false },
      metaDescription: { type: String, required: false },
      metaKeywords: [{ type: String, required: false }],
      ogTitle: { type: String, required: false },
      ogDescription: { type: String, required: false },
      ogImage: { type: String, required: false },
    },

    sitemap: { type: String, required: false },
    robotsTxt: { type: String, required: false },

  },
  { timestamps: true }
);

export const CompanyDetailModel = mongoose.model(
  'CompanyDetail',
  schema
);
