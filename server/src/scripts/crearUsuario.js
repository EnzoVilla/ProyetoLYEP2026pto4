const mongoose = require('mongoose');
const conectarDB = require('../db/conexion');
const Usuario = require('../models/Usuario');
const usuarioService = require('../services/usuarioService');
const { usuarioSchema } = require('../validations/usuario');

const crearUsuario = async () => {
  const resultado = usuarioSchema.safeParse({
    email: process.env.CARGA_EMAIL,
    password: process.env.CARGA_PASSWORD,
    nombre: process.env.CARGA_NOMBRE,
    sector: process.env.CARGA_SECTOR,
  });

  if (!resultado.success) {
    console.error('Revisá CARGA_EMAIL, CARGA_PASSWORD, CARGA_NOMBRE y CARGA_SECTOR.');
    for (const error of resultado.error.issues) {
      console.error(`${error.path.join('.')}: ${error.message}`);
    }
    process.exitCode = 1;
    return;
  }

  try {
    await conectarDB();
    await Usuario.init();
    const usuario = await usuarioService.crearUsuario(resultado.data);
    console.log(`Usuario creado: ${usuario.email} (${usuario.sector})`);
  } catch (error) {
    console.error(
      error.code === 11000
        ? 'El email ya está registrado. No se modificó el usuario existente.'
        : 'No se pudo crear el usuario. Revisá la conexión y configuración de MongoDB.',
    );
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

crearUsuario().catch(() => {
  console.error('No se pudo finalizar la carga del usuario.');
  process.exitCode = 1;
});
