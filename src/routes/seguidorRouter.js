const { Router } = require("express");
const seguidorController = require("../controller/seguidorController.js");

const routerSeguidor= Router();

routerSeguidor.get(
  "/recuperar-actividades-dia/:idAdulto",
  seguidorController.recuperarAcitivadesDia
);


module.exports = routerSeguidor;
