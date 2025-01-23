const { z } = require('zod');

const serviceSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required').max(100, 'Service ID is too long'),
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  image: z.string().optional(), 
});

module.exports = { serviceSchema };
