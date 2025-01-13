import { z } from 'zod';

export const counterSchema = z.object({
    title: z.string(),
    number: z.string(),
});