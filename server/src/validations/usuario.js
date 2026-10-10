const { z } = require('zod');

const usuarioSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido'),
  password: z.string().min(1),
  nombre: z.string().trim().min(1),
  sector: z.enum(['Soporte', 'Gerencia']),
}).strict();

const usuarioUpdateSchema = usuarioSchema
  .partial()
  .strict()
  .refine((datos) => Object.keys(datos).length > 0, {
    message: 'Debe enviar al menos un campo para actualizar',
  });

const loginSchema = z.object({
  email: usuarioSchema.shape.email,
  password: z.string().min(1),
  sector: usuarioSchema.shape.sector,
}).strict();

module.exports = { usuarioSchema, usuarioUpdateSchema, loginSchema };
