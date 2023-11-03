const { Router } = require("express");
const consultas_Login = require("../controller/AdminController.js");

const router_Admin = Router();

router_Admin.get("/verUsuarios", consultas_Login.obtenerUsuarios);

module.exports = router_Admin;
