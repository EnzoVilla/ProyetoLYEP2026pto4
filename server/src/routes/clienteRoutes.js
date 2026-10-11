const express = require('express');
const clienteController = require('../controllers/clienteController');
const { validarEsquema } = require('../middlewares/validarEsquema');
const { clienteSchema, clienteUpdateSchema } = require('../validations/cliente');
const { idSchema } = require('../validations/id');
const autenticar = require('../middlewares/autenticar');
const autorizar = require('../middlewares/autorizar');

const router = express.Router();

router.use(autenticar);
router.get('/', clienteController.obtenerTodos);
router.get('/:id', validarEsquema(idSchema, 'params'), clienteController.obtenerPorId);
router.post('/', validarEsquema(clienteSchema), clienteController.crearCliente);
router.put(
  '/:id',
  autorizar('Gerencia'),
  validarEsquema(idSchema, 'params'),
  validarEsquema(clienteUpdateSchema),
  clienteController.actualizarCliente,
);
router.delete('/:id',
  autorizar('Gerencia'),
  validarEsquema(idSchema, 'params'), 
  clienteController.eliminarCliente);

module.exports = router;
