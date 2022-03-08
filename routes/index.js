const pool = require("../utils/mysql");
const router = require("express").Router();
const moment = require("moment");

router.get("/", (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("Error connecting to database");
      console.log(err);
      return res.render("index.ejs", {
        users: [],
        moment: moment,
      });
    }
    connection.query("SELECT * FROM session.users", (err, result) => {
      connection.release();
      if (err) {
        console.log(err);
        return res.render("index.ejs", {
          users: [],
          moment: moment,
        });
      }

      console.log(result);
      return res.render("index.ejs", {
        users: result || [],
        newUser: null,
        moment: moment,
      });
    });
  });
});

router.post("/new", async (req, res) => {
  const { username, fname, mname, lname, password } = req.body;
  console.log({
    username,
    fname,
    mname,
    lname,
    password,
  });
  if (!fname || !password || !username) {
    console.log("Not inserted");
    return res.redirect("/");
  }
  pool.getConnection((error, connection) => {
    if (error) {
      console.log("Error connecting to database");
      console.log(err);
      return res.redirect("/");
    }
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

module.exports = router;
