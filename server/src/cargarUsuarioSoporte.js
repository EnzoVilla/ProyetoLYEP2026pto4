const mongoose = require('mongoose');
const conectarDB = require('./db/conexion');
const usuarioService = require('./services/usuarioService');

const cargarUsuarioSoporte = async () => {
  try {
    const {
      SOPORTE_EMAIL,
      SOPORTE_PASSWORD,
      SOPORTE_NOMBRE,
    } = process.env;

    if (!SOPORTE_EMAIL || !SOPORTE_PASSWORD || !SOPORTE_NOMBRE) {
      throw new Error('Faltan los datos del usuario Soporte en .env');
    }

    await conectarDB();

    const usuario = await usuarioService.crearUsuario({
      email: SOPORTE_EMAIL,
      password: SOPORTE_PASSWORD,
      nombre: SOPORTE_NOMBRE,
      sector: 'Soporte',
    });

    console.log('Usuario Soporte creado:', usuario.email);
  } finally {
    await mongoose.disconnect();
  }
};

cargarUsuarioSoporte().catch((error) => {
  console.error(
    error.code === 11000
      ? 'El email ya está registrado'
      : error.message,
  );

  process.exitCode = 1;
});