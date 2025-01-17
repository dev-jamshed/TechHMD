import { z } from 'zod';

const serviceSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(255, "Name is too long"),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description is too long"),
  shortDescription: z.string().optional(),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(100, "Slug is too long"),
  parentService: z.string().optional(),
  metaTitle: z.string().min(3, "Meta Title must be at least 3 characters").max(100, "Meta Title is too long").optional(),
  metaDescription: z.string().min(10, "Meta Description must be at least 10 characters").max(300, "Meta Description is too long").optional(),
});

export const slugSchema = z.object({
  slug: z.string().min(3, { message: "invalid slug" }).max(72, { message: "invalid slug" })
})


export { serviceSchema };
