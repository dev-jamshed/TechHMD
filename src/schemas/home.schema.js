const { z } = require("zod");

const homeSchema = z.object({
  heading: z.string().min(1, "Heading is required"),
  description: z.string().min(1, "Description is required"),
});

module.exports = { homeSchema };
