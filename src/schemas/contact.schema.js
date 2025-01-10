import { z } from 'zod';

// Zod schema for Contact Validation
export const contactValidationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(1, { message: "Message is required" }),
  phone: z.string().optional(), // Optional phone field
});
