const { z } = require("zod");

const heroSectionSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  buttonText: z.string().optional(),
  buttonLink: z.string().url("Button Link must be a valid URL").optional(),
  image: z.string().optional(),
  pageName: z.string().optional(),
  serviceId: z.string().optional(),
}).refine(data => data.pageName || data.serviceId, {
  message: "Either pageName or serviceId is required",
  path: ["pageName", "serviceId"],
});

module.exports = { heroSectionSchema };
