const { connection } = require("../config/conexionDB.js");

const consultas_Salud = {
  verDatosBebe: async (req, res) => {
    const { id } = req.params;
    const query =
      "select IDBebe, Nombre, Apellidos, Edad, FechaNacimiento, Sexo, Altura, Peso from bebes where IDBebe = ?";
    try {
      // Realiza la consulta a la base de datos
      connection.query(query, [id], (error, results, fields) => {
        if (error) {
          console.error("Error en la consulta", error);
          return res.status(500).json({ msg: "Error al realizar la consulta" });
        }

        // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
        if (results.length === 0) {
          return res.status(404).json({
            msg: "No se encontraron datos para el ID de bebé proporcionado",
          });
        } else {
          const bebeData = results[0]; // Suponiendo que solo se espera un registro
          return res.json(bebeData);
        }
      });
    } catch (error) {
      console.error("Error en la consulta", error);
      return res.status(500).json({ msg: "Error al realizar la consulta" });
    }
  },

  obtenerPadres: async (req, res) => {
    const { id } = req.params;
    const query = `SELECT concat(ab.Nombre,' ', ab.Apellidos) as Nombre, ab.IDRol FROM bebes b
            LEFT JOIN adultosxbebe axb ON axb.IDBebe = b.IDBebe 
            LEFT JOIN adultos ab ON ab.IDAdulto = axb.IDAdulto
            WHERE b.IDBebe = ?
            ORDER BY ab.IDRol ASC`;
    try {
      // Realiza la consulta a la base de datos
      connection.query(query, [id], (error, results, fields) => {
        if (error) {
          console.error("Error en la consulta", error);
          return res.status(500).json({ msg: "Error al realizar la consulta" });
        }

        // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
        if (results.length === 0) {
          return res.status(404).json({
            msg: "No se encontraron datos para el ID de bebé proporcionado",
          });
        } else {
          const padresData = results; // Suponiendo que solo se espera un registro
          return res.json(padresData);
        }
      });
    } catch (error) {
      console.error("Error en la consulta", error);
      return res.status(500).json({ msg: "Error al realizar la consulta" });
    }
  },

  obtenerAlergias: async (req, res) => {
    const { id } = req.params;
    const query = `SELECT a.Nombre as Padecimiento, axb.IDAlergia as id FROM alergiasxbebe axb
            join alergias a on a.IDAlergia = axb.IDAlergia
            WHERE axb.IDBebe = ?`;
    try {
      // Realiza la consulta a la base de datos
      connection.query(query, [id], (error, results, fields) => {
        if (error) {
          console.error("Error en la consulta", error);
          return res.status(500).json({ msg: "Error al realizar la consulta" });
        }

        // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
        if (results.length === 0) {
          return res.status(404).json({
            msg: "No se encontraron datos para el ID de bebé proporcionado",
          });
        } else {
          const alergias = results; // Suponiendo que solo se espera un registro
          return res.json(alergias);
        }
      });
    } catch (error) {
      console.error("Error en la consulta", error);
      return res.status(500).json({ msg: "Error al realizar la consulta" });
    }
  },

  obtenerDiagnosticos: async (req, res) => {
    const { id } = req.params;
    const query = `SELECT d.Detalle as Padecimiento, dxb.IDdiagnosticoxBebe as id FROM diagnosticoxbebe dxb
            RIGHT join diagnosticomedico d on d.IDDiagnostico =dxb.IDDiagnostico
            WHERE dxb.IDBebe = ?`;
    try {
      // Realiza la consulta a la base de datos
      connection.query(query, [id], (error, results, fields) => {
        if (error) {
          console.error("Error en la consulta", error);
          return res.status(500).json({ msg: "Error al realizar la consulta" });
        }

        // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
        if (results.length === 0) {
          return res.status(404).json({
            msg: "No se encontraron datos para el ID de bebé proporcionado",
          });
        } else {
          const padresData = results; // Suponiendo que solo se espera un registro
          return res.json(padresData);
        }
      });
    } catch (error) {
      console.error("Error en la consulta", error);
      return res.status(500).json({ msg: "Error al realizar la consulta" });
    }
  },

  obtenerMedicamentos: async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT
            dxb.IDDiagnostico as id,
            m.Nombre AS nombre,
            dm.Detalle as detalle
        FROM
            diagnosticoxbebe dxb
        JOIN bebes b ON
            b.IDBebe = dxb.IDBebe
        JOIN recetamedicamento rm ON
            rm.IDDiagnostico = dxb.IDDiagnostico
        JOIN medicamento m ON
            m.IDMedicamento = rm.IDMedicamento
        JOIN diagnosticomedico dm ON
            dm.IDDiagnostico = dxb.IDDiagnostico
        WHERE
            b.IDBebe = ?
    `;
    try {
      // Realiza la consulta a la base de datos
      connection.query(query, [id], (error, results, fields) => {
        if (error) {
          console.error("Error en la consulta", error);
          return res.status(500).json({ msg: "Error al realizar la consulta" });
        }

        // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
        if (results.length === 0) {
          return res.status(404).json({
            msg: "No se encontraron datos para el ID de bebé proporcionado",
          });
        } else {
          const MedicamentosData = results; // Suponiendo que solo se espera un registro
          return res.json(MedicamentosData);
        }
      });
    } catch (error) {
      console.error("Error en la consulta", error);
      return res.status(500).json({ msg: "Error al realizar la consulta" });
    }
  },

  obtenerVacunas: async (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT
            vxb.IDvacunasxbebe AS id,
            v.Nombre AS nombre,
            vxb.FechaAplicacion AS detalle
        FROM
            vacunasxbebe vxb
        JOIN vacunas v ON
            v.IDVacuna = vxb.IDVacuna
        JOIN bebes b ON
            b.IDBebe = vxb.IDBebe
        WHERE
            vxb.IDBebe = ?
    `;
    try {
      // Realiza la consulta a la base de datos
      connection.query(query, [id], (error, results, fields) => {
        if (error) {
          console.error("Error en la consulta", error);
          return res.status(500).json({ msg: "Error al realizar la consulta" });
        }

        // Si la consulta fue exitosa, devuelve los resultados como respuesta JSON
        if (results.length === 0) {
          return res.status(404).json({
            msg: "No se encontraron datos para el ID de bebé proporcionado",
          });
        } else {
          const VacunasData = results; // Suponiendo que solo se espera un registro
          return res.json(VacunasData);
        }
      });
    } catch (error) {
      console.error("Error en la consulta", error);
      return res.status(500).json({ msg: "Error al realizar la consulta" });
    }
  },

  eliminarDiagnostico: async (req, res) => {
    try {
      const IDdiagnosticoxBebe = req.params.idDiagnosticoBebe;

      const consulta = `
             DELETE 
             FROM diagnosticoxbebe 
             WHERE IDdiagnosticoxBebe = ${IDdiagnosticoxBebe}
          `;
      let resultado = false;
      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error("Error al insertar el adulto por bebé:", error);
            reject(error);
          } else {
            resultado = true;
            resolve(results);
          }
        });
      });

      res.json({ resultado: resultado });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error en el servidor al eliminar el diagnostico",
      });
    }
  },
  eliminarAlergia: async (req, res) => {
    try {
      const IDAlergiaxBebe = req.params.idAlergia;

      const consulta = `
             DELETE 
             FROM alergiasxbebe 
             WHERE IDAlergiaxBebe = ${IDAlergiaxBebe}
          `;
      let resultado = false;
      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error("Error al eliminar la alergia:", error);
            reject(error);
          } else {
            resultado = true;
            resolve(results);
          }
        });
      });

      res.json({ resultado: resultado });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error en el servidor al eliminar la alergia",
      });
    }
  },

  obtenerCatalogoAlergias: async (req, res) => {
    try {
      const consulta = `
            SELECT * FROM alergias
          `;

      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error("Error al insertar el adulto por bebé:", error);
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
        error: "Error en el servidor al eliminar el diagnostico",
      });
    }
  },
  obtenerCatalogoDiagnosticos: async (req, res) => {
    try {
      const consulta = `
            SELECT * FROM diagnosticomedico
          `;

      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error(
              "Error al obtener el catalogo de diagnosticos:",
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
        error: "Error en el servidor al obtener el catalogo de diagnosticos",
      });
    }
  },
  insertarAlergia: async (req, res) => {
    try {
      const IDpadecimiento = req.body.idPadecimiento;
      const tipoInsert = req.body.tipoInsert;
      const IDbebe = req.body.IDbebe;
      const fechaInicioParam = req.body.fechaInicio;
      const fechaFinParam = req.body.fechaFin;
      const fechaDiagnosticoParam = req.body.fechaDiagnostico;
      const nombreMedico = req.body.nombreMedico;

      let consulta = ``;

      if (tipoInsert == "alergia") {
        const fechaInicio = new Date(fechaInicioParam);
        const fechaFin = new Date(fechaFinParam);

        // Formatea las fechas a un formato compatible con MySQL (YYYY-MM-DD).
        const fechaInicioFormateada = fechaInicio.toISOString().slice(0, 10);
        const fechaFinFormateada = fechaFin.toISOString().slice(0, 10);

        consulta = `
          INSERT INTO alergiasxbebe(Inicio, Fin, IDBebe, IDAlergia) 
          VALUES ('${fechaInicioFormateada}', '${fechaFinFormateada}', ${IDbebe}, ${IDpadecimiento})
       `;
      } else {
        const fechaDiagnostico = new Date(fechaDiagnosticoParam);
        const fechaDiagnosticoFormateada = fechaDiagnostico
          .toISOString()
          .slice(0, 10);

        consulta = `
        INSERT INTO diagnosticoxbebe(NombreMedico, IDDiagnostico, IDBebe, Fecha) 
        VALUES ('${nombreMedico}', ${IDpadecimiento}, ${IDbebe}, '${fechaDiagnosticoFormateada}')
        `;
      }

      let resultado = false;
      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error("Error al insertar el padecimiento: ", error);
            reject(error);
          } else {
            resultado = true;
            resolve(results);
          }
        });
      });

      res.json({ resultado: resultado });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Error en el servidor al insertar el padecimiento",
      });
    }
  },
};

module.exports = consultas_Salud;
