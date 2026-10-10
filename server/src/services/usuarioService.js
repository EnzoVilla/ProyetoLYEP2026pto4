const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');

const obtenerTodos = async () => {
  return await Usuario.find();
};

const obtenerPorId = async (id) => {
  return await Usuario.findById(id);
};

const crearUsuario = async (datos) => {
  const datosUsuario = { ...datos };

  if (datosUsuario.password) {
    datosUsuario.passwordHash = await bcrypt.hash(datosUsuario.password, 12);
    delete datosUsuario.password;
  }

  return await Usuario.create(datosUsuario);
};

const autenticarUsuario = async (email, password, sector) => {
  const usuario = await Usuario.findOne({
    email: email.trim().toLowerCase(),
    sector,
  }).select('+passwordHash');

  if (!usuario || !(await bcrypt.compare(password, usuario.passwordHash))) {
    return null;
  }

  return usuario;
};

const actualizarUsuario = async (id, datos) => {
  return await Usuario.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true,
  });
};

const eliminarUsuario = async (id) => {
  return await Usuario.findByIdAndDelete(id);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearUsuario,
  autenticarUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
