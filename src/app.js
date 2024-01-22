const express = require("express");
const app = express();
const spreadRoutes = require("./routes/spreadRoutes");

// Middlewares
app.use(express.json());

// Rutas
app.use("/api/services", spreadRoutes);
// app.use('/mi-ruta', miRuta);

// Manejo de errores 404 (No encontrado)
app.use((req, res, next) => {
  res.status(404).send("Página no encontrada");
});

module.exports = app;
