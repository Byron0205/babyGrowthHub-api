const { createServer } = require('http');
const app = require('./config/express.js');
const { config } = require("dotenv");
config();


const PORT = process.env.PORT;

createServer(app).listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
  console.log(`http://localhost:3000`)
});
