const { z } = require('zod');

const pageMetaTagsSchema = z.object({
  pageName: z.string().min(1, "Page Name is required"),
  metaTitle: z.string().min(1, "Meta Title is required"),
  metaDescription: z.string().min(1, "Meta Description is required"),
  metaKeywords: z.array(
    z.string().min(1, "Meta Keyword is required")
  ),
  pageContent: z.string().min(1, "Page Content is required"),
  organizationSchema: z.string().min(1, "Organization Schema is required")
});

module.exports = { pageMetaTagsSchema };

