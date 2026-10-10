const express = require('express');
const clienteController = require('../controllers/clienteController');
const { validarEsquema } = require('../middlewares/validarEsquema');
const { clienteSchema, clienteUpdateSchema } = require('../validations/cliente');
const { idSchema } = require('../validations/id');

const router = express.Router();

router.get('/', clienteController.obtenerTodos);
router.get('/:id', validarEsquema(idSchema, 'params'), clienteController.obtenerPorId);
router.post('/', validarEsquema(clienteSchema), clienteController.crearCliente);
router.put(
  '/:id',
  validarEsquema(idSchema, 'params'),
  validarEsquema(clienteUpdateSchema),
  clienteController.actualizarCliente,
);
router.delete('/:id', validarEsquema(idSchema, 'params'), clienteController.eliminarCliente);

module.exports = router;
