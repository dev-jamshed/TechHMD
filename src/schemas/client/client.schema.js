const { z } = require('zod');

const clientSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    description: z.string().optional(),
    website_url: z.string().url("Invalid URL").optional(),
    is_featured: z.union([z.boolean(), z.string()]).transform((val) => val === 'true' || val === true),
});

module.exports = { clientSchema };
