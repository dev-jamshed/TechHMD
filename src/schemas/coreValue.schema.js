
import { z } from 'zod';

export const coreValueSchema = z.object({
  title: z.string("Title is required"),
  description: z.string("Description is required")
});