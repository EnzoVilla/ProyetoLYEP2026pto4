const { z } = require('zod');

const usuarioSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido'),
  passwordHash: z.string().min(1),
  nombre: z.string().trim().min(1),
  sector: z.enum(['Soporte', 'Gerencia']),
});

module.exports = { usuarioSchema };
