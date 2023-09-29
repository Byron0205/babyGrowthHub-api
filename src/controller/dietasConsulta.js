const { connection } = require("../config/conexionDB.js");


const dietas = {
    obtenerDietas: async (req, res) => {
        try {
            connection.query("SELECT `IDDieta`, `Nombre`, `Detalles`, `Edad`, `img` FROM `dietas`", (error, results) => {
                if (error) {
                    console.error("Error al ejecutar la consulta:", error);
                    res.status(500).json({ error: "Error al ejecutar la consulta" });
                } else {
                    res.json(results);
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Error en el servidor" });
        }
    }
};

module.exports = dietas;
