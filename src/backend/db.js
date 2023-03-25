// Use the MariaDB Node.js Connector
const mariadb = require("mariadb");
const Sequelize = require('sequelize');

// Create a connection pool
const pool = 
  mariadb.createPool({
    host: "127.0.0.1", 
    port: 3307,
    user: "root", 
    password: "Ruutti",
    database: "mydb"
  });
 
// Expose a method to establish connection with MariaDB SkySQL
module.exports = Object.freeze({
  pool: pool
});

const sequelize = new Sequelize('mydb', 'root', 'Ruutti', {
  host: '127.0.0.1',
  dialect: 'mariadb', 
});

module.exports = sequelize;