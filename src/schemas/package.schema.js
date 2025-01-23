const { z } = require('zod');

const packageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  serviceId: z.string().min(1, "ServiceId is required"),
  price: z.string().min(0, "Price is required"),
  features: z.array(z.string()).nonempty("Features are required"), // Add features field as an array
  description: z.string().optional(),
});

module.exports = { packageSchema };
