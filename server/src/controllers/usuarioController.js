const usuarioService = require('../services/usuarioService');
const jwt = require('jsonwebtoken');

const iniciarSesion = async (req, res) => {
  const { email, password, sector } = req.body;

  if (!email || !password || !sector) {
    return res.status(400).json({ mensaje: 'Email, contraseña y sector son obligatorios' });
  }

  try {
    const usuario = await usuarioService.autenticarUsuario(email, password, sector);

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET no está configurado');
    }

    const token = jwt.sign(
      { usuarioId: usuario._id.toString(), sector: usuario.sector },
      process.env.JWT_SECRET,
      { expiresIn: '8h' },
    );

    return res.json({ token, usuario });
  } catch (error) {
    return res.status(500).json({ mensaje: error.message });
  }
};

const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodos();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const obtenerPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerPorId(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.actualizarUsuario(req.params.id, req.body);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioService.eliminarUsuario(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = {
  iniciarSesion,
  obtenerTodos,
  obtenerPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
