const validarEsquema = (esquema) => (req, res, next) => {
  const resultado = esquema.safeParse(req.body);

  if (!resultado.success) {
    return res.status(400).json({
      mensaje: 'Los datos enviados no son válidos',
      errores: resultado.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensaje: issue.message,
      })),
    });
  }

  req.body = resultado.data;
  next();
};

module.exports = { validarEsquema };
