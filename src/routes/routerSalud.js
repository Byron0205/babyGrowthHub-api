const { Router } = require("express");
const consultas_Salud = require("../controller/SaludController.js");

const routerSalud = Router();

routerSalud.get("/verExpediente/:id", consultas_Salud.verDatosBebe);
routerSalud.get("/ver-padres/:id", consultas_Salud.obtenerPadres);

routerSalud.get("/verDiagnosticos/:id", consultas_Salud.obtenerDiagnosticos);
routerSalud.get("/verAlergias/:id", consultas_Salud.obtenerAlergias);
routerSalud.get("/verMedicamentos/:id", consultas_Salud.obtenerMedicamentos);
routerSalud.get("/verVacunas/:id", consultas_Salud.obtenerVacunas);

// Eliminar cosas del expediente o mediacion
routerSalud.get(
    "/eliminar-diagnostico/:idDiagnosticoBebe",
    consultas_Salud.eliminarDiagnostico
);
routerSalud.get(
    "/eliminar-alergia/:idAlergia",
    consultas_Salud.eliminarAlergia
);
routerSalud.get(
    "/eliminar-medicamento/:IDmedicamentoxBebe",
    consultas_Salud.eliminarMedicamento
);
routerSalud.get(
    "/eliminar-vacuna/:IDvacunaxBebe",
    consultas_Salud.eliminarVacuna
);

//Insertar nuevas cosas al expediente o medicacion
routerSalud.post("/insertar-padecimiento", consultas_Salud.insertarAlergia);
routerSalud.post("/insertar-medicina", consultas_Salud.insertarMedicina);

//Obtener datos de catalogo
routerSalud.get("/obtener-alergias", consultas_Salud.obtenerCatalogoAlergias);
routerSalud.get(
    "/obtener-diagnosticos",
    consultas_Salud.obtenerCatalogoDiagnosticos
);
routerSalud.get(
    "/obtener-diagnosticos-medicamentos/:IDDiagnostico",
    consultas_Salud.obtenerMedicamentosXDiagnosticos
);
routerSalud.get(
    "/obtener-diagnosticos-bebe/:id",
    consultas_Salud.obtenerDiagnosticosBebe
);
routerSalud.get("/obtener-vacunas", consultas_Salud.obtenerCatalogoVacunas);

module.exports = routerSalud;
