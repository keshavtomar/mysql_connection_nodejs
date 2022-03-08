// requiring the router from the package "express"
const router = require("express").Router();

// requring moment to handle date/time formatting
const moment = require("moment");

// requiring the pool from the utils/mysql.js file
const pool = require("../utils/mysql");

//
//

// defining the route for the root of the application
router.get("/", (req, res) => {
  // creating a connection our of the pool
  pool.getConnection((error, connection) => {
    // if there is an error, handle it gracefully
    // so that the client does not know about the error in the server
    if (error) {
      // logging in the server, just to know that error occured
      console.log("Error connecting to database");
      console.log(err);
      // graceful handling the error
      return res.render("index.ejs", {
        users: [],
        moment: moment,
      });
    }

    // if there was no error, continue with the connection object
    // it takes two arguments, the query and the callback function
    // the callback function takes two arguments, error and results
    connection.query("SELECT * FROM session.users", (err, result) => {
      // once the query is done, release the connection,
      // so that it can be used by other queries
      connection.release();
      if (err) {
        // handle the errors gracefully in running the sql query
        console.log(err);
        return res.render("index.ejs", {
          users: [],
          moment: moment,
        });
      }
      // if there was no error, continue with the result object
      // it contains the data returned by the query
      // the result object is an array of objects
      // each object is a row in the table
      // the result object is passed to the ejs template
      console.log(result);
      return res.render("index.ejs", {
        users: result || [],
        newUser: null,
        moment: moment,
      });
    });
  });
});

//
//

// route to add a new user in the database
router.post("/new", async (req, res) => {
  // getting the data from the form
  const { username, fname, mname, lname, password } = req.body;
  console.log({
    username,
    fname,
    mname,
    lname,
    password,
  });
  // validating for the required fields
  // and handling errors gracefully
  if (!fname || !password || !username) {
    console.log("Not inserted");
    return res.redirect("/");
  }
  // creating a connection our of the pool
  pool.getConnection((error, connection) => {
    if (error) {
      // logging in the server, just to know that error occured
      // gracefully handling the errors
      console.log("Error connecting to database");
      console.log(err);
      return res.redirect("/");
    }
    // if there was no error, continue with the connection object
    // writing the sql query to insert the data
    // to insert/update data with dynamic data (obviously), use the ? placeholder
    // in that cast it takes one more argument as a javascript object, which contains the dynamic data to be inserted
    connection.query(
      "INSERT INTO session.users SET ?",
      {
        username: username,
        fname: fname,
        mname: mname,
        lname: lname,
        password: password,
        createdon: new Date(),
      },
      (err, result) => {
        connection.release();
        if (err) {
          console.log("Not inserted");
          console.log(err);
        }
        if (result) {
          console.log(result);
          console.log("inserted");
        }
        return res.redirect("/");
      }
    );
  });
});

// exporting the router to be used as a middleware in the root file
module.exports = router;
