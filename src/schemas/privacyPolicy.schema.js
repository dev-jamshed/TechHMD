const { z } = require('zod');

const privacyPolicySchema = z.object({
    title: z.string(),
    content: z.string(),
    image: z.string().optional()
});

module.exports = { privacyPolicySchema };
