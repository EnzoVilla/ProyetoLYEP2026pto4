const Cliente = require('../models/Cliente');

const obtenerTodos = async () => {
  return await Cliente.find();
};

const obtenerPorId = async (id) => {
  return await Cliente.findById(id);
};

const crearCliente = async (datos) => {
  return await Cliente.create(datos);
};

const actualizarCliente = async (id, datos) => {
  return await Cliente.findByIdAndUpdate(id, datos, {
    new: true,
    runValidators: true,
  });
};

const eliminarCliente = async (id) => {
  return await Cliente.findByIdAndDelete(id);
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
