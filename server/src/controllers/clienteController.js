const clienteService = require('../services/clienteService');

const obtenerTodos = async (req, res) => {
  try {
    const clientes = await clienteService.obtenerTodos();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const cliente = await clienteService.obtenerPorId(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const crearCliente = async (req, res) => {
  try {
    const cliente = await clienteService.crearCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizarCliente = async (req, res) => {
  try {
    const cliente = await clienteService.actualizarCliente(
      req.params.id,
      req.body,
    );
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const eliminarCliente = async (req, res) => {
  try {
    const cliente = await clienteService.eliminarCliente(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  obtenerTodos,
  obtenerPorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
