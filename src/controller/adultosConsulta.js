const { connection } = require("../config/conexionDB.js");


const adultos = {
    obtenerAdultosConRoles: async (req, res) => {
        try {
            const query = `
                SELECT a.IDAdulto, a.Nombre, a.Apellidos, a.Correo, a.Contrasenna,
                        a.FechaRegistro, a.Activo, ab.IDRol, r.Nombre AS "ROL"
                FROM adultos AS a
                JOIN adultosxbebe AS ab ON a.IDAdulto = ab.IDAdulto
                JOIN adultos_rol AS r ON ab.IDRol = r.IDRol;
            `;

            connection.query(query, (error, results) => {
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
    },

    obtenerAdultosPorID: async (req, res) => {
        const { IDAdulto } = req.params;

        try {
            const query = `

            SELECT a.IDAdulto, a.Nombre, a.Apellidos, a.Correo, a.Contrasenna,
            a.FechaRegistro, a.Activo, r.Nombre AS "ROL",
            b.Nombre AS "NombreHijo", b.Apellidos AS "ApellidoHijo",
            b.IDBebe AS "IDBebe"

            FROM adultos AS a
            JOIN adultosxbebe AS ab ON a.IDAdulto = ab.IDAdulto
            JOIN adultos_rol AS r ON ab.IDRol = r.IDRol
            LEFT JOIN bebes AS b ON ab.IDBebe = b.IDBebe
    
            WHERE a.IDAdulto = ?;

            `;

            connection.query(query, [IDAdulto], (error, results) => {
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
    },

    obtenerAdultosxBebe: async (req, res) => {
        try {
            const query = `

            SELECT a.IDAdulto, a.Nombre, a.Apellidos, a.Correo, a.Contrasenna,
            a.FechaRegistro, a.Activo, ab.IDRol, r.Nombre AS "ROL", b.Nombre AS "NombreHijo",
            b.Apellidos AS "ApellidoHijo", b.IDBebe AS "IDBebe"
            FROM adultos AS a
            JOIN adultosxbebe AS ab ON a.IDAdulto = ab.IDAdulto
            JOIN adultos_rol AS r ON ab.IDRol = r.IDRol
            LEFT JOIN bebes AS b ON ab.IDBebe = b.IDBebe;

            `;

            connection.query(query, (error, results) => {
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
    },

    modificarAdulto: async (req, res) => {
        const { IDAdulto } = req.params;

        const { Nombre, Apellidos, Correo } = req.body;

        const nombreRegex = /^[A-Za-z\s]+$/;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!Nombre || !Apellidos || !Correo) {
            return res
                .status(400)
                .json({ error: "Nombre, Apellidos y Correo son campos requeridos" });
        }

        if (!nombreRegex.test(Nombre) || !nombreRegex.test(Apellidos)) {
            return res
                .status(400)
                .json({
                    error: "Nombre y Apellidos solo pueden contener letras y espacios",
                });
        }

        if (!emailRegex.test(Correo)) {
            return res.status(400).json({ error: "Correo electrónico inválido" });
        }

        if (!Nombre || !Apellidos || !Correo) {
            return res
                .status(400)
                .json({ error: "Nombre, Apellidos y Correo son campos requeridos" });
        }

        try {
            const query = `

            UPDATE \`adultos\`

            SET \`Nombre\` = ?, \`Apellidos\` = ?, \`Correo\` = ?

            WHERE \`IDAdulto\` = ?;

            `;

            connection.query(
                query,
                [Nombre, Apellidos, Correo, IDAdulto],
                (error, results) => {
                    if (error) {
                        console.error("Error al modificar el adulto:", error);

                        res.status(500).json({ error: "Error al modificar el adulto" });
                    } else {
                        if (results.affectedRows === 0) {
                            res.status(404).json({ message: "Adulto no encontrado" });
                        } else {
                            res.json({ message: "Adulto modificado exitosamente" });
                        }
                    }
                }
            );
        } catch (error) {
            console.log(error);

            res.status(500).json({ error: "Error en el servidor" });
        }
    },
    consultaPanel: async ( req, res) => {
        const { IDBebe } = req.params;
        const query = `
            SELECT a.IDAdulto, CONCAT(a.Nombre, ' ', a.Apellidos) AS NombreCompleto, ab.EncargadoPrincipal,
                    r.Nombre AS Rol
            FROM adultos AS a
            JOIN adultosxbebe AS ab ON a.IDAdulto = ab.IDAdulto
            JOIN adultos_rol AS r ON ab.IDRol = r.IDRol
            WHERE ab.IDBebe = ?;
        `;

        connection.query(query, [IDBebe], (error, results) => {
            if (error) {
                console.error("Error al ejecutar la consulta:", error);

                res.status(500).json({ error: "Error al ejecutar la consulta" });
            } else {
                res.json(results);
            }
        });
    },
    modificarRolConsultaPanel: async (req, res) => {
        const { IDBebe } = req.params;
        const { IDAdulto, NuevoRol } = req.body; 
    
        const updateQuery = `
            UPDATE adultosxbebe
            SET IDRol = ?
            WHERE IDBebe = ? AND IDAdulto = ?;
        `;
    
        connection.query(updateQuery, [NuevoRol, IDBebe, IDAdulto], (error, results) => {
            if (error) {
                console.error("Error al ejecutar la consulta:", error);
                res.status(500).json({ error: "Error al ejecutar la consulta de modificación" });
            } else {
                res.json({ message: "Rol modificado exitosamente" });
            }
        });
    },
    
};

module.exports = adultos;
