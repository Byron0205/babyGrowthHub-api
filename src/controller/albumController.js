const { connection } = require("../config/conexionDB.js");

const albumController = {
    recuperarMultimedia: async (req, res) => {
        try {
            const idBebe = req.params.idBebe;
            const idAlbum = req.params.idAlbum;

            console.log(`${idBebe} | ${idAlbum}`);

            const consulta = `
        SELECT * FROM multimedia 
        WHERE IDBebe = ${idBebe}
        AND IDAlbum = ${idAlbum}
      `;

            const results = await new Promise((resolve, reject) => {
                connection.query(consulta, (error, results) => {
                    if (error) {
                        console.error(
                            "Error en la consulta recuperar multimedia:",
                            error
                        );
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });

            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar multimedia",
            });
        }
    },
};

module.exports = albumController;
