import { z } from 'zod';

export const primaryBannerSchema = z.object({
    title: z.string(),
    description: z.string(),
    pageName: z.string(),
});
