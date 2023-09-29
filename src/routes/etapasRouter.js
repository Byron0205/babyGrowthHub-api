const { Router } = require("express");
const etapasController = require("../controller/etapasController.js");


const routerConsultas = Router();


routerConsultas.get("/etapa-desarrollo", etapasController.obtenerEtapas);

module.exports = routerConsultas;