const { Router } = require("express");
const tokenController = require("../controller/tokensControllers.js");

const routerTokens = Router();

routerTokens.get("/enviar-token/:email/:formatmail", tokenController.sendToken);
routerTokens.post("/validar-token", tokenController.validateToken);

module.exports = routerTokens;
