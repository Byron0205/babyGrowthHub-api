const { connection } = require("../config/conexionDB.js");

//!Refactorizar mensajes de errores*/

const consultas = {
    recuperarActividades: async (req, res) => {
        try {
            const IDadulto = req.params.idadulto;

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
        ab.IDAdulto = ${IDadulto};
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
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar actividades del calendario",
            });
        }
    },
    recuperarCategorias: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                connection.query(
                    "SELECT * FROM actividades_categoria",
                    (error, results) => {
                        if (error) {
                            console.error(
                                "Error en la consulta recuperar actividades calendario:",
                                error
                            );
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar actividades del calendario",
            });
        }
    },
    recuperarPrioridades: async (req, res) => {
        try {
            const results = await new Promise((resolve, reject) => {
                connection.query(
                    "SELECT * FROM actividades_prioridad",
                    (error, results) => {
                        if (error) {
                            console.error(
                                "Error en la consulta recuperar actividades calendario:",
                                error
                            );
                            reject(error);
                        } else {
                            resolve(results);
                        }
                    }
                );
            });
            res.json(results);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar actividades del calendario",
            });
        }
    },
    eliminarActividad: async (req, res) => {
        try {
            const IDActividad = req.params.idactividad;
            const IDbebe = req.params.idbebe;

            const consulta = `
        DELETE FROM actividades WHERE IDActividad = ${IDActividad} AND IDBebe = ${IDbebe}; 
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
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar actividades del calendario",
            });
        }
    },
    insertarActividad: async (req, res) => {
        try {
            const titulo = req.body.titulo;
            const detalle = req.body.detalle;
            const fecha = req.body.fecha;
            const hora = req.body.hora;
            const idbebe = req.body.idbebe;
            const idcategoria = req.body.idcategoria;
            const idprioridad = req.body.idprioridad;

            // Para evitar errores de formato de MariaDB
            const formattedDate = new Date(fecha)
                .toISOString()
                .slice(0, 19)
                .replace("T", " ");

            const consulta = `
      INSERT INTO actividades 
      (IDActividad, Titulo, Detalle, Fecha, Hora, IDBebe, IDCategoria, IDprioridad)
      VALUES (NULL, ?, ?, ?, ?, ?, ?, ?);
    `;

            const values = [
                titulo,
                detalle,
                formattedDate,
                hora,
                idbebe,
                idcategoria,
                idprioridad,
            ];

            const results = await new Promise((resolve, reject) => {
                connection.execute(consulta, values, (error, results) => {
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
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar actividades del calendario",
            });
        }
    },
    recuperarBebes: async (req, res) => {
        try {
            const IDadulto = req.params.idadulto;

            const consulta = `
        SELECT 
          a.IDBebe,
          CONCAT(b.Nombre, ' ', b.Apellidos) AS NombreCompleto
        FROM
        adultosxbebe a
        JOIN
        bebes b
        ON
        a.IDBebe = b.IDBebe
        WHERE
        IDAdulto = ${IDadulto}
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
            console.log(error);
            res.status(500).json({
                error: "Error en el servidor al recuperar los babés asociados al adulto",
            });
        }
    },
};

module.exports = consultas;
