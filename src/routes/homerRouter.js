const { Router } = require("express");
const homeController = require("../controller/homeController.js");

const routerHome = Router();

routerHome.get("/recuperar-consejos", homeController.recuperarConsejos);
routerHome.get(
    "/recuperar-nombres-significados",
    homeController.recuperarNombresSignificados
);

module.exports = routerHome;
