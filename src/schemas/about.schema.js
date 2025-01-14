import { z } from "zod";

export const aboutSchema = z.object({
  type: z.string().min(1, "type is required"),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
});
