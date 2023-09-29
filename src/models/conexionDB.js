const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '138.59.135.33', //localhost cuando se suba a plesk
  user: 'ggBrianj',
  password: 'tjDq12_94',
  database: 'tiusr3pl_BabyGrowthHub',
});

module.exports = { connection };
