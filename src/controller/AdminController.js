const { connection } = require("../config/conexionDB.js");

const consultas_Admin = {
    obtenerUsuarios: async (req, res) => {
        const query = `SELECT concat(a.Nombre, ' ', a.Apellidos) as Nombre,a.FechaRegistro, ar.Nombre as Rol, concat(b.Nombre, ' ',b.Apellidos) as Bebe, a.Correo FROM adultos a 
            
            JOIN adultosxbebe axb on axb.IDAdulto = a.IDAdulto
            join adultos_rol ar on ar.IDRol = axb.IDRol
            join bebes b on b.IDBebe = axb.IDBebe
            where axb.IDRol != 4`;
        try {
            // Realiza la consulta a la base de datos
            connection.query(query, (error, results, fields) => {
                if (error) {
                    console.error("Error en la consulta", error);
                    return res
                        .status(500)
                        .json({ msg: "Error al realizar la consulta" });
                }

                // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
                if (results.length === 0) {
                    return res.status(404).json({
                        msg: "No se encontraron datos para el ID de bebé proporcionado",
                    });
                } else {
                    const usersData = results; // Suponiendo que solo se espera un registro
                    return res.json(usersData);
                }
            });
        } catch (error) {
            console.error("Error en la consulta", error);
            return res
                .status(500)
                .json({ msg: "Error al realizar la consulta" });
        }
    },
};

module.exports = consultas_Admin;
