const { connection } = require("../config/conexionDB.js");
const moment = require("moment");

function calcularFechaDeNacimiento(semanasEmbarazo) {
    // Verificamos que el número de semanas esté en el rango válido
    if (semanasEmbarazo < 1 || semanasEmbarazo > 40) {
        throw new Error("El número de semanas debe estar entre 1 y 40.");
    }

    // Obtenemos la fecha actual
    const fechaActual = moment();

    // Calculamos la fecha de nacimiento sumando las semanas de embarazo a la fecha actual
    const fechaNacimiento = fechaActual.add(semanasEmbarazo, "weeks");

    // Formateamos la fecha de nacimiento como una cadena legible
    const fechaFormateada = fechaNacimiento.format("YYYY-MM-DD");

    return fechaFormateada;
}

const consultas_Login = {
    validarLogin: async (req, res) => {
        const { correo, contrasenna } = req.body;
        const query = `SELECT a.IDAdulto, a.Correo, a.Contrasenna, axb.IDRol, CONCAT(a.Nombre, ' ', a.Apellidos) AS Nombre
            FROM adultos a
            JOIN adultosxbebe axb ON axb.IDAdulto = a.IDAdulto
            WHERE Contrasenna = ? AND Correo = ?
            ORDER BY a.IDAdulto DESC
            LIMIT 1;`;
        try {
            connection.query(
                query,
                [contrasenna, correo],
                (error, results, fields) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        return res
                            .status(500)
                            .json({ msg: "Error al realizar la consulta" });
                    }

                    if (results.length > 0) {
                        const logData = results;
                        //login is valid in bd
                        return res.json({
                            msg: "Login realizado correctamente",
                            id: logData[0].IDAdulto,
                            rol: logData[0].IDRol,
                            nombre: logData[0].Nombre,
                        });
                    } else {
                        //login not valid, user not exist
                        return res.status(401).json({
                            msg: "Usuario y/o contraseña incorrectos",
                        });
                    }
                }
            );
        } catch (error) {
            console.error("Error al validar el login:", error);
            return res
                .status(500)
                .json({ message: "Error en la validación del login" });
        }
    },

    IngresarPadre: async (req, res) => {
        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener los componentes de la fecha (año, mes, día)
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
        const day = String(fechaActual.getDate()).padStart(2, "0");

        // Formatear la fecha en el formato deseado: "YYYY-MM-DD"
        const fechaFormateada = `${year}-${month}-${day}`;

        const { IDAdulto, Nombre, Apellidos, Correo, Contrasenna } = req.body;
        const query =
            "Insert into Adultos(IDAdulto,Nombre,Apellidos,Correo,Contrasenna,FechaRegistro, Activo)values(?,?,?,?,?,?,?)";
        try {
            connection.query(
                query,
                [
                    IDAdulto,
                    Nombre,
                    Apellidos,
                    Correo,
                    Contrasenna,
                    fechaFormateada,
                    0,
                ],
                (error, fields) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        return res
                            .status(500)
                            .json({ msg: "Error al realizar la consulta" });
                    }
                    return res.json({ msg: "usuario creado correctamente" });
                }
            );
        } catch (error) {}
    },

    ingresarBebe: async (req, res) => {
        let edadCalculada;
        let fechaNacimientoCalculada;

        // Obtener la fecha actual
        const fechaActual = new Date();

        // Obtener los componentes de la fecha (año, mes, día)
        const year = fechaActual.getFullYear();
        const month = String(fechaActual.getMonth() + 1).padStart(2, "0");
        const day = String(fechaActual.getDate()).padStart(2, "0");

        // Formatear la fecha en el formato deseado: "YYYY-MM-DD"
        const fechaFormateada = `${year}-${month}-${day}`;

        const { IDBebe, Nombre, Apellidos, Edad, FechaNacimiento, Sexo } =
            req.body;

        //validar fecha de nacimiento
        if (FechaNacimiento !== "") {
            const fechanacimiento = new Date(FechaNacimiento);
            const hoy = new Date();
            //console.log(fechanacimiento.getFullYear())
            //console.log(hoy.getFullYear())

            const annos = hoy.getFullYear() - fechanacimiento.getFullYear();

            edadCalculada = annos;
            fechaNacimientoCalculada = FechaNacimiento;
        } else {
            try {
                console.log(Edad);
                const semanasEmbarazo = Edad; // Ingresa aquí el número de semanas de embarazo
                fechaNacimientoCalculada =
                    calcularFechaDeNacimiento(semanasEmbarazo);
                edadCalculada = Edad;
            } catch (error) {
                console.error(error.message);
            }
        }

        const query =
            "Insert into bebes(IDBebe,Nombre,Apellidos,Edad,FechaNacimiento,Sexo,FechaRegistro)values(?,?,?,?,?,?,?)";
        try {
            connection.query(
                query,
                [
                    IDBebe,
                    Nombre,
                    Apellidos,
                    edadCalculada,
                    fechaNacimientoCalculada,
                    Sexo,
                    fechaFormateada,
                ],
                (error, fields) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        return res
                            .status(500)
                            .json({ msg: "Error al realizar la consulta" });
                    }
                    return res.json({ msg: "bebe ingresado correctamente" });
                }
            );
        } catch (error) {
            console.error("Error en el servidor", error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },

    modificarBebe: async (req, res) => {
        const { Nombre, Peso, Altura, Sexo, IDBebe } = req.body; // Obtén los campos actualizados del bebé desde el cuerpo de la solicitud

        // Construir la consulta para actualizar los campos del bebé
        const query =
            "UPDATE bebes SET Nombre = ?, Peso = ?, Altura = ?, Sexo = ? WHERE IDBebe = ?";

        try {
            connection.query(
                query,
                [Nombre, Peso, Altura, Sexo, IDBebe],
                (error, fields) => {
                    if (error) {
                        console.error("Error en la consulta", error);
                        return res
                            .status(500)
                            .json({ msg: "Error al realizar la consulta" });
                    }
                    return res.json({ msg: "Bebé modificado correctamente" });
                }
            );
        } catch (error) {
            console.error("Error en el servidor", error);
            return res.status(500).json({ msg: "Error en el servidor" });
        }
    },
};

module.exports = consultas_Login;
