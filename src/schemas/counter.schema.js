const { z } = require('zod');

const counterSchema = z.object({
    title: z.string(),
    number: z.string(),
});

module.exports = { counterSchema };