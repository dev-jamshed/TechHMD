const { z } = require("zod");
const { ValidMongoId } = require("../utils/global.js");

const inquirySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  subject: z
    .string({ required_error: "Subject is required" })
    .min(5, { message: "Subject must be at least 5 characters long" }),
  message: z
    .string({ required_error: "Message is required" })
    .min(10, { message: "Message must be at least 10 characters long" }),
  serviceId: ValidMongoId,
  packageId: ValidMongoId
});

module.exports = { inquirySchema };
