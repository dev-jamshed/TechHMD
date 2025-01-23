const { z } = require('zod');

const ourCoreTeamSchema = z.object({
  name: z.string("name is required"),
  designation: z.string("Designation is required"),
  description: z.string("Description is required").optional(),
  is_featured: z.union([z.boolean(), z.string()]).transform((val) => val === 'true' || val === true),
  linkedin_url: z.string().url("Linkedin link must be a valid URL").optional(),
});

module.exports = { ourCoreTeamSchema };
