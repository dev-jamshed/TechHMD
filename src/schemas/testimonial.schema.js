import { z } from "zod";

export const testimonialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  user: z.string().min(1, "User name is required"),
  position: z.string().min(1, "Position is required"),
  image: z.string().optional(), // Image is optional
});
