const { Router } = require("express");
const albumController = require("../controller/albumController.js");

const routerAlbum = Router();

routerAlbum.get(
    "/recuperar-multimedia/:idBebe/:idAlbum",
    albumController.recuperarMultimedia
);

module.exports = routerAlbum;
