const express = require('express');
const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.get('/', clienteController.obtenerTodos);
router.get('/:id', clienteController.obtenerPorId);
router.post('/', clienteController.crearCliente);
router.put('/:id', clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);

module.exports = router;
