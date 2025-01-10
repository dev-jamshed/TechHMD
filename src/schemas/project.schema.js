import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
  link: z.string().url().optional(),
  serviceID: z.string().min(1, "Service ID is required"),
});
