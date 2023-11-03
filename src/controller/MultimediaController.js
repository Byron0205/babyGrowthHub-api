const { connection } = require("../config/conexionDB.js");

const Multimedia = {
    insertarMultimedia: async (req, res) => {
        const {
            NombreRecuerdo,
            IDEtapa,
            TipoArchivo,
            RutaArchivo,
            IDAlbum,
            IDBebe,
        } = req.body;

        const IDMultimedia = Math.floor(Math.random() * 100000);
        const fechaSubida = new Date().toISOString().slice(0, 10);

        const query =
            "INSERT INTO `multimedia`(`IDMultimedia`, `NombreRecuerdo`, `IDEtapa`, `TipoArchivo`, `RutaArchivo`, `FechaSubida`, `IDAlbum`, `IDBebe`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        try {
            connection.execute(
                query,
                [
                    IDMultimedia,
                    NombreRecuerdo,
                    IDEtapa,
                    TipoArchivo,
                    RutaArchivo,
                    fechaSubida,
                    IDAlbum,
                    IDBebe,
                ],
                (error, results, fields) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        return res
                            .status(500)
                            .json({ msg: "Error al realizar la consulta" });
                    }

                    return res.json({ msg: "Inserción exitosa" });
                }
            );
        } catch (error) {
            console.error("Error en la consulta", error);
            return res
                .status(500)
                .json({ msg: "Error al realizar la consulta" });
        }
    },
};

module.exports = Multimedia;
