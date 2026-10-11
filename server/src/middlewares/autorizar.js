const autorizar = (...sectoresPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        mensaje: 'Debés iniciar sesión',
      });
    }

    if (!sectoresPermitidos.includes(req.usuario.sector)) {
      return res.status(403).json({
        mensaje: 'No tenés permisos para realizar esta operación',
      });
    }

    next();
  };
};

module.exports = autorizar;