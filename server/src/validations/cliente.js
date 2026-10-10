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

const clienteUpdateSchema = z.object({
  email: clienteSchema.shape.email.optional(),
  username: z.string().trim().optional(),
  name: z
    .object({
      firstname: z.string().trim().min(1).optional(),
      lastname: z.string().trim().optional(),
    })
    .optional(),
  address: z
    .object({
      city: z.string().trim().min(1).optional(),
      street: z.string().trim().optional(),
      number: z.string().trim().optional(),
      zipcode: z.string().trim().optional(),
    })
    .optional(),
  phone: clienteSchema.shape.phone.optional(),
});

module.exports = { clienteSchema, clienteUpdateSchema };
