// Use the MariaDB Node.js Connector
const mariadb = require("mariadb");
 
// Create a connection pool
const pool = 
  mariadb.createPool({
    host: "127.0.0.1", 
    port: 3307,
    user: "root", 
    password: "ruutti",
    database: "mydb"
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});
