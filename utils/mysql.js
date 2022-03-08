//  requiring the mysql module
const mysql = require("mysql");

/*
  creating a pool of connections
  here we are not connecting to the database
  just defining the configuration for the connection(s)

  Pool just by its name, is a large collections of connections
  that are kept in a pool and are used when needed
  instead of creating a new connection for every query

  the pool is a singleton, meaning that only one instance of the pool is created
  and that instance is shared by all the code that uses the pool

  pools should always have a connection limit to prevent overloading the server
  and to prevent the server from running out of resources (memory, connections, etc)
  here, we define the connection limit to 10
*/

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASS,
  database: process.env.MYSQL_DATABASE,
});

// exporting pool to be used in other files
module.exports = pool;
