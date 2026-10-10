const { z } = require('zod');

const idSchema = z.object({
  id: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, 'El ID no esta en un formato valido'),
});

module.exports = { idSchema };
