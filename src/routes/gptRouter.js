const { Router } = require("express");
const gptController = require("../controller/gptController.js");

const gptRouter = Router();

gptRouter.post("/preguntar-chat", gptController.obtenerRespuesta);

module.exports = gptRouter;
