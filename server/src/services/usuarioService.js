const Usuario = require('../models/Usuario');

const obtenerTodos = async () => {
  return await Usuario.find();
};

const obtenerPorId = async (id) => {
  return await Usuario.findById(id);
};

const crearUsuario = async (datos) => {
  return await Usuario.create(datos);
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
  actualizarUsuario,
  eliminarUsuario,
};
