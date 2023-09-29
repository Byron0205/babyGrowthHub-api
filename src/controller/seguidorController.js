const { connection } = require("../config/conexionDB.js");

const seguidorController = {
  recuperarAcitivadesDia: async (req, res) => {
    try {
      const idAdulto = req.params.idAdulto;

      const consulta = `
        SELECT
          a.IDActividad,
          a.Titulo,
          a.Detalle,
          a.Fecha,
          a.Hora,
          ap.nombrePrioridad,
          ap.colorPrioridad,
          ac.Nombre AS CategoriaNombre,
          ac.Color AS CategoriaColor,
          b.IDBebe,
          CONCAT(b.Nombre, ' ', b.Apellidos) AS NombreCompleto
        FROM
          actividades a
        JOIN actividades_prioridad ap ON
          a.idPrioridad = ap.idPrioridad
        JOIN actividades_categoria ac ON
          a.IDCategoria = ac.IDCategoria
        JOIN bebes b ON
          a.IDBebe = b.IDBebe
        JOIN adultosxbebe ab ON
          ab.IDBebe = b.IDBebe
        WHERE
          ab.IDAdulto = ${idAdulto}
          AND a.Fecha = CURDATE();
        `;
      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error(
              "Error en la consulta recuperar actividades calendario:",
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
      console.error(
        "Error en la consulta recuperar actividades del día:",
        error
      );
      return res.status(500).json({
        message: "Error en el servidor al recuperar actividades del día",
      });
    }
  },
};

module.exports = seguidorController;
