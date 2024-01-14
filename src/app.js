const express = require("express");
const app = express();

// Middlewares
// Aquí puedes añadir middlewares globales si los necesitas, por ejemplo:
// app.use(express.json()); // Para parsear bodies tipo JSON

// Rutas
// Aquí configurarás las rutas. Por ejemplo:
// const miRuta = require('./routes/miRuta');
// app.use('/mi-ruta', miRuta);

// Manejo de errores 404 (No encontrado)
app.use((req, res, next) => {
  res.status(404).send("Página no encontrada");
});

module.exports = app;
