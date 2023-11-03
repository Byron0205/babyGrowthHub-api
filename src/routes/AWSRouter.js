const { Router } = require("express");
const { subirArchivoA_S3 } = require("../config/AWSConfig");
const routerAWS = Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "ArchivosUsuarios/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

routerAWS.post("/subir-imagen", upload.single("archivo"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No se encontró el archivo" });
        }

        const archivo = req.file;

        const rutaTemporal = archivo.path;
        const nombreBucket = "sw-baby-growth-hub";

        const resultado = await subirArchivoA_S3(
            archivo.originalname,
            rutaTemporal,
            nombreBucket
        );

        console.log(resultado);

        fs.unlink(rutaTemporal, (err) => {
            if (err) {
                console.error("Error al eliminar el archivo local:", err);
            }
        });

        res.json({ mensaje: "Archivo subido exitosamente", urlS3: resultado });
    } catch (error) {
        res.status(500).json({
            error: error.message || "Error al subir el archivo a S3",
        });
    }
});

module.exports = routerAWS;
