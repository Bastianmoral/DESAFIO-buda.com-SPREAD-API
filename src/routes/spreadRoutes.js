const express = require("express");
const router = express.Router();
const spreadController = require("../controllers/spreadController");

//Ruta para obtener el spread de todos los mercados
router.get("/all-markets", spreadController.getAllMarketSpreads);

//Ruta para obtener el spread de un mercado especifico
router.get("/market/:marketId/spread", spreadController.getMarketSpread);

//Ruta para configurar y consultar un spread de alerta
//POST para configurar un nuevo spread de alerta
router.post("alert", spreadController.setAlertSpread);
//GET para consultar el spread de alerta
router.get("/alert", spreadController.getAlertSpread);

module.exports = router;
