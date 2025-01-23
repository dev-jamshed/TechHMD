const { z } = require('zod');

const ourWorkProcessSchema = z.object({
  serviceId: z.string().nonempty("Service ID is required"),
  icon: z.string("Icon is required").optional(),
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required")
});

module.exports = { ourWorkProcessSchema };
