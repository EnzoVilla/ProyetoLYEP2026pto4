const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { validarEsquema } = require("../middlewares/validarEsquema");
const { usuarioSchema, usuarioUpdateSchema, loginSchema } = require("../validations/usuario");
const { idSchema } = require("../validations/id");

router.post("/login", validarEsquema(loginSchema), usuarioController.iniciarSesion);
router.get("/", usuarioController.obtenerTodos);
router.get("/:id", validarEsquema(idSchema, "params"), usuarioController.obtenerPorId);
router.post("/", validarEsquema(usuarioSchema), usuarioController.crearUsuario);
router.put(
  "/:id",
  validarEsquema(idSchema, "params"),
  validarEsquema(usuarioUpdateSchema),
  usuarioController.actualizarUsuario,
);
router.delete("/:id", validarEsquema(idSchema, "params"), usuarioController.eliminarUsuario);

module.exports = router;
