const { z } = require('zod');

const clienteSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido'),
  username: z.string().trim().default(''),
  name: z.object({
    firstname: z.string().trim().min(1),
    lastname: z.string().trim().default(''),
  }),
  address: z.object({
    city: z.string().trim().min(1),
    street: z.string().trim().default(''),
    number: z.string().trim().default(''),
    zipcode: z.string().trim().default(''),
  }),
  phone: z.string().trim().min(1),
});

module.exports = { clienteSchema };
