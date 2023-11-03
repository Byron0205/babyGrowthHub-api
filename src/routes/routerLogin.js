const { Router } = require("express");
const consultas_Login = require("../controller/loginController.js");

const routerLogin = Router();

routerLogin.post("/login", consultas_Login.validarLogin);

routerLogin.post("/registrarAdulto", consultas_Login.IngresarPadre);

routerLogin.post("/registrarBebe", consultas_Login.ingresarBebe);

routerLogin.put("/modificarBebe", consultas_Login.modificarBebe);

module.exports = routerLogin;
