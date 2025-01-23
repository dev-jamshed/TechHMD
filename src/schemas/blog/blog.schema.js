const { z } = require("zod");

const blogSchema = z.object({
    title: z.string().min(12, { message: "Title must be atleast of 12 characters" }).max(124, { message: "Title can't exceed 124 characters" }),
    metaTitle: z.string().min(12, { message: "Meta title must be atleast of 12 characters" }).max(124, { message: "meta title can't exceed 124 characters" }),
    description: z.string().max(124, { message: "Description can't exceed 256 characters" }).optional(),
    metaDescription: z.string().max(124, { message: "Description can't exceed 256 characters" }).optional(),
    content: z.string().min(124, { message: "Content must be of atleast 124 characters" }).max(10000, { message: "Content can't exceed 10,000 characters" }),
});

module.exports = { blogSchema };