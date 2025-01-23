const { z } = require('zod');

const aboutOurWorkProcessSchema = z.object({
  title: z.string("Title is required"),
  description: z.string("Description is required")
});

module.exports = { aboutOurWorkProcessSchema };