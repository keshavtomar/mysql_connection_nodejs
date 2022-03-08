require("dotenv").config();
const express = require("express");
const pool = require("./utils/mysql");
const app = express();

const routes = require("./routes");

app.set("view engine", "ejs");
app.set("views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  pool.query(
    "CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, fname VARCHAR(255) NOT NULL, mname VARCHAR(255), lname VARCHAR(255), password VARCHAR(255) NOT NULL, createdon VARCHAR(100));"
  );
  console.log("INFO: Server is running on port ", port);
});
