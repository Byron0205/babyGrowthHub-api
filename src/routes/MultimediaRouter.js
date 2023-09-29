const { Router } = require("express");
const Multimedia = require("../controller/MultimediaController");


const routerConsultas = Router();


routerConsultas.post("/subir-multimedia", Multimedia.insertarMultimedia); 

module.exports = routerConsultas;