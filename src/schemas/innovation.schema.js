import { z } from 'zod';

const innovationItemSchema = z.object({
    // icon: z.string().url(),
    title: z.string(),
    description: z.string(),
});

export const innovationSchema = z.object({
    title_1: z.string().optional(),
    title_2: z.string(),
    description: z.string(),
    innovations: z.array(innovationItemSchema),
});
