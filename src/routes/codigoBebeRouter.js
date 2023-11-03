const { Router } = require("express");
const codigoBebeController = require("../controller/codigoBebeController.js");

const codigoBebeRouter = Router();

codigoBebeRouter.get(
    "/validar-codigo-bebe/:idBebe",
    codigoBebeController.validarCodigoBebe
);
codigoBebeRouter.post(
    "/enviar-codigo-bebe",
    codigoBebeController.enviarCodigoBebe
);
codigoBebeRouter.post(
    "/vincular-adulto-bebe",
    codigoBebeController.vincularAdultoXbebe
);

module.exports = codigoBebeRouter;
