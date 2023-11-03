const express = require("express");
const cors = require("cors");
const app = express();

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
const routerCalendario = require("../routes/calendarioRouter.js");
app.use(routerCalendario);

const routerTokens = require("../routes/tokensRoutes.js");
app.use(routerTokens);

const routerSeguidor = require("../routes/seguidorRouter.js");
app.use(routerSeguidor);

const routerHome = require("../routes/homerRouter.js");
app.use(routerHome);

const codigoBebeRouter = require("../routes/codigoBebeRouter.js");
app.use(codigoBebeRouter);

const routerEtapas = require("../routes/etapasRouter.js");
app.use(routerEtapas);

const routerLogin = require("../routes/routerLogin.js");
app.use(routerLogin);

const routerSalud = require("../routes/routerSalud.js");
app.use(routerSalud);

const routerDietas = require("../routes/dietasRouter.js");
app.use(routerDietas);

const router_Admin = require("../routes/routerAdmin.js");
app.use(router_Admin);

const aws_Imagen = require("../routes/AWSRouter.js");
app.use(aws_Imagen);

const multimedia = require("../routes/MultimediaRouter.js");
app.use(multimedia);

const preguntasChat = require("../routes/gptRouter.js");
app.use(preguntasChat);

const albumes = require("../routes/albumRouter.js");
app.use(albumes);

module.exports = app;
