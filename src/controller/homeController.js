const { connection } = require("../config/conexionDB.js");


const homeController = {
  recuperarConsejos: async (req, res) => {
    try {
      const consulta = `
        SELECT * FROM consejos
        `;
      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error("Error en la consulta al recuperar los consejos:", error);
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      res.json(results);
    } catch (error) {
      console.error("Error en la consulta recuperar los consejos:", error);
      return res.status(500).json({
        message: "Error en el servidor al recuperar los consejos",
      });
    }
  },
  recuperarNombresSignificados: async (req, res) => {
    try {
      const consulta = `
        SELECT * FROM nombres_significados
        `;
      const results = await new Promise((resolve, reject) => {
        connection.query(consulta, (error, results) => {
          if (error) {
            console.error("Error en la consulta al recuperar los NS:", error);
            reject(error);
          } else {
            resolve(results);
          }
        });
      });

      res.json(results);
    } catch (error) {
      console.error("Error en la consulta al recuperar los NS:", error);
      return res.status(500).json({
        message: "Error en el servidor al recuperar los NS",
      });
    }
  },
};

module.exports = homeController;
