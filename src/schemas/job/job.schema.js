const { z } = require('zod');

const jobSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be at most 100 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    requirements: z.array(z.string()).nonempty("Requirements are required"),
    location: z.string().min(3, "Location must be at least 3 characters"),
    is_active: z.union([z.boolean(), z.string(), z.number()])
    .transform((val) => {
        if (val === '1' || val === 1) {
            return true;
        } else if (val === '0' || val === 0) {
            return false;
        }
        return Boolean(val); // This ensures it works for boolean values as well
    }),
});

module.exports = { jobSchema };
