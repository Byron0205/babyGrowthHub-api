const { createServer } = require("http");
const app = require("./express.js");

const server = createServer(app);

module.exports = server;