import { z } from "zod";

export const aboutSchema = z.object({
  pageName: z.string().optional(),
  serviceId: z.string().optional(),
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
}).refine(data => data.pageName || data.serviceId, {
  message: "Either pageName or serviceId is required",
  path: ["pageName", "serviceId"],
});;
