// dotenv module to setup the environment variables
require("dotenv").config();

// express module to handle the routing, server stuff
const express = require("express");

// connection pool module to handle the database connection
const pool = require("./utils/mysql");

// initializing a new instance of the express server
// this is basically initializing the server itself
const app = express();

// requiring the routes module
const routes = require("./routes");

// setting view engine as ejs
app.set("view engine", "ejs");

// setting the folder for the ejs files
app.set("views");

// using the express.json() to be able to parse the json data
app.use(express.json());

// using the express.urlencoded() to be able to parse the urlencoded data
app.use(express.urlencoded({ extended: true }));

// using the routes module in the root route
app.use("/", routes);

// declaring the port
const port = process.env.PORT || 5000;
// making the server listen on the defined port
app.listen(port, async () => {
  // creating a table if not exists already just to make sure all works fine
  pool.query(
    "CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, fname VARCHAR(255) NOT NULL, mname VARCHAR(255), lname VARCHAR(255), password VARCHAR(255) NOT NULL, createdon VARCHAR(100));"
  );
  // logging to see the connection is open
  console.log("INFO: Server is running on port ", port);
});
