const dbConfig = require("./config/db.config");
const Pool = require('pg').Pool
const pool = new Pool({
  user: dbConfig.USER,
  host: dbConfig.HOST,
  database: dbConfig.DB,
  password: dbConfig.PASSWORD,
  
})

module.exports = pool;
