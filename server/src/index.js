const express = require("express");
const cors = require("cors");
const app = express();
const usuarioRoutes = require("./routes/usuarioRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const port = process.env.PORT ?? 3001;
const conectarDB = require("./db/conexion");

app.use(express.json());
// cors solo aceptando desde el front
app.use(cors({ origin: process.env.URL_FRONT }));

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/clientes", clienteRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const iniciar = async () => {
  await conectarDB();

  app.listen(port, () => {
    console.log(`Backend grupo 04 lyep listening on port ${port}`);
  });
};

iniciar().catch((error) => {
  console.error("No se pudo iniciar:", error.message);
  process.exit(1);
});
