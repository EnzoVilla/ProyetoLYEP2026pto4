const jwt = require('jsonwebtoken');

const autenticar = (req, res, next) => {
  const authorization = req.get('Authorization');
  const partes = authorization?.trim().split(/\s+/);

  if (
    partes?.length !== 2 ||
    partes[0].toLowerCase() !== 'bearer'
  ) {
    return res.status(401).json({
      mensaje: 'Debés iniciar sesión',
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      mensaje: 'La autenticación no está configurada',
    });
  }

  try {
    const contenido = jwt.verify(
      partes[1],
      process.env.JWT_SECRET,
      { algorithms: ['HS256'] },
    );

    if (
      typeof contenido !== 'object' ||
      typeof contenido.usuarioId !== 'string' ||
      !['Soporte', 'Gerencia'].includes(contenido.sector)
    ) {
      return res.status(401).json({
        mensaje: 'Token inválido',
      });
    }

    req.usuario = {
      id: contenido.usuarioId,
      sector: contenido.sector,
    };

    next();
  } catch {
    return res.status(401).json({
      mensaje: 'Sesión inválida o vencida',
    });
  }
};

module.exports = autenticar;