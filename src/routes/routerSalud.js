const { Router } = require("express");
const consultas_Salud = require('../controller/SaludController.js');

const routerSalud = Router()

routerSalud.get('/verExpediente/:id', consultas_Salud.verDatosBebe);

routerSalud.get('/ver-padres/:id', consultas_Salud.obtenerPadres)

routerSalud.get('/verDiagnosticos/:id', consultas_Salud.obtenerDiagnosticos)

routerSalud.get('/verAlergias/:id', consultas_Salud.obtenerAlergias)

routerSalud.get('/verMedicamentos/:id', consultas_Salud.obtenerMedicamentos)

routerSalud.get('/verVacunas/:id', consultas_Salud.obtenerVacunas)

// Eliminar cosas del expediente o mediacion

routerSalud.get('/eliminar-diagnostico/:idDiagnosticoBebe', consultas_Salud.eliminarDiagnostico)

routerSalud.get('/eliminar-alergia/:idAlergia', consultas_Salud.eliminarAlergia)

//Insertar nuevas cosas al expediente o medicacion
routerSalud.post('/insertar-padecimiento', consultas_Salud.insertarAlergia)

//Obtener datos de catalogo
routerSalud.get('/obtener-alergias', consultas_Salud.obtenerCatalogoAlergias)
routerSalud.get('/obtener-diagnosticos', consultas_Salud.obtenerCatalogoDiagnosticos)

module.exports = routerSalud;