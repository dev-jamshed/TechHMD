const { z } = require('zod');

const coreValueSchema = z.object({
  title: z.string("Title is required"),
  description: z.string("Description is required")
});

module.exports = { coreValueSchema };