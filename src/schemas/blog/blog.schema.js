import { z } from "zod";

export const blogSchema = z.object({
    title: z.string().min(3, { message: "Title must be atleast of 3 characters" }).max(512, { message: "Title can't exceed 512 characters" }),
    metaTitle: z.string().min(12, { message: "Meta title must be atleast of 12 characters" }).max(512, { message: "meta title can't exceed 512 characters" }),
    description: z.string().max(1024, { message: "Description can't exceed 1024 characters" }).optional(),
    metaDescription: z.string().max(124, { message: "Description can't exceed 256 characters" }).optional(),
    content: z.string().min(32, { message: "Content must be of atleast 32 characters" }),
})