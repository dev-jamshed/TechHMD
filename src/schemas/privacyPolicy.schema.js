import { z } from 'zod';

export const privacyPolicySchema = z.object({
    title: z.string(),
    content: z.string(),
    image: z.string().optional()
});
