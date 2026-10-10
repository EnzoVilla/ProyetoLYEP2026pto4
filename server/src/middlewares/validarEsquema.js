const validarEsquema = (esquema, propiedad = 'body') => (req, res, next) => {
  const resultado = esquema.safeParse(req[propiedad]);

  if (!resultado.success) {
    return res.status(400).json({
      mensaje: 'Los datos enviados no son válidos',
      errores: resultado.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensaje: issue.message,
      })),
    });
  }

  req[propiedad] = resultado.data;
  next();
};

module.exports = { validarEsquema };
