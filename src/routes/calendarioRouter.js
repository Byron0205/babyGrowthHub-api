const { Router } = require("express");
const calendarioController = require("../controller/calendarioController.js");

const routerConsultasCalendario = Router();

routerConsultasCalendario.get(
    "/recuperar-actividades/:idadulto",
    calendarioController.recuperarActividades
);
routerConsultasCalendario.get(
    "/recuperar-categorias",
    calendarioController.recuperarCategorias
);
routerConsultasCalendario.get(
    "/recuperar-prioridades",
    calendarioController.recuperarPrioridades
);
routerConsultasCalendario.get(
    "/recuperar-bebes/:idadulto",
    calendarioController.recuperarBebes
);
routerConsultasCalendario.post(
    "/eliminar-actividad/:idactividad/:idbebe",
    calendarioController.eliminarActividad
);
routerConsultasCalendario.post(
    "/insertar-actividad/",
    calendarioController.insertarActividad
);

module.exports = routerConsultasCalendario;
