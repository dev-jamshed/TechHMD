const { z } = require('zod');

const primaryBannerSchema = z.object({
    title: z.string(),
    description: z.string(),
    pageName: z.string(),
});

module.exports = { primaryBannerSchema };
