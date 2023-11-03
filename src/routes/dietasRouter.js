const { Router } = require("express");
const dietasController = require("../controller/dietasConsulta.js");
const adultosController = require("../controller/adultosConsulta.js");

const routerConsultas = Router();

routerConsultas.get("/adultos", adultosController.obtenerAdultosConRoles);
routerConsultas.get(
    "/adultos/:IDAdulto",
    adultosController.obtenerAdultosPorID
);
routerConsultas.get("/adultosxbebe/:IDBebe", adultosController.consultaPanel);
routerConsultas.get("/dietas", dietasController.obtenerDietas);

routerConsultas.put(
    "/adultosxbebe/:IDBebe",
    adultosController.modificarRolConsultaPanel
);
routerConsultas.put("/adultos/:IDAdulto", adultosController.modificarAdulto);

module.exports = routerConsultas;
