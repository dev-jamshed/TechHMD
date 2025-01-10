import {z} from "zod"

export const faqValidationSchema = z.object({
    question: z
        .string({
            required_error: "Question is required",
            invalid_type_error: "Question must be a string",
        })
        .min(5, { message: "Question must be at least 5 characters long" })
        .max(255, { message: "Question must not exceed 255 characters" }),

    answer: z
        .string({
            required_error: "Answer is required",
            invalid_type_error: "Answer must be a string",
        })
        .min(5, { message: "Answer must be at least 5 characters long" })
        .max(1000, { message: "Answer must not exceed 1000 characters" }),
});

