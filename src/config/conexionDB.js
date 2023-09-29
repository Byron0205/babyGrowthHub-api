const mysql = require("mysql2");
const { config } = require("dotenv");
config();

// Recuperar valores para la conexion
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const connection = mysql.createConnection({
  host: "138.59.135.33", //localhost cuando se suba a plesk
  user: DB_USERNAME,
  password: DB_PASS,
  database: DB_NAME,
});

module.exports = { connection };
