import { z } from 'zod';

export const companyDetailSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1, "Name cannot be empty"),
  slogan: z.string({ required_error: "Slogan is required" }).min(1, "Slogan cannot be empty").optional(),
  sloganDescription: z.string({ required_error: "Slogan Description is required" }).min(1, "Slogan Description cannot be empty").optional(),
  description: z.string({ required_error: "Description is required" }).min(1, "Description cannot be empty"),
  address: z.string({ required_error: "Address is required" }).min(1, "Address cannot be empty"),
  phone1: z.string({ required_error: "Phone1 is required" }).min(10, "Phone1 must be at least 10 digits"),
  phone2: z.string({ required_error: "Phone2 is required" }).min(10, "Phone2 must be at least 10 digits"),
  email1: z.string({ required_error: "Email1 is required" }).email("Email1 must be a valid email"),
  email2: z.string({ required_error: "Email2 is required" }).email("Email2 must be a valid email"),
  socialMedia: z.object({
    facebook: z.string().url("Facebook link must be a valid URL").optional(),
    twitter: z.string().url("Twitter link must be a valid URL").optional(),
    instagram: z.string().url("Instagram link must be a valid URL").optional(),
    linkedin: z.string().url("LinkedIn link must be a valid URL").optional(),
    youtube: z.string().url("YouTube link must be a valid URL").optional(),
  }).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    metaKeywords: z.array(z.string()).optional(),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
  }).optional(),
  sitemap: z.string().optional(),
  robotsTxt: z.string().optional(),
});
