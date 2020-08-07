const express = require("express");
const db = require("./database");

const router = express.Router();


router.get("/", (req, res) => {

  let sql = `SELECT id, Vorname, Nachname, email, website FROM Users`;
  db.all(sql, [], (err, rows) => {

    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {
  let response = {};

  let sql = `SELECT Vorname, Nachname, email, website FROM Users WHERE id = ?`;
  db.all(sql, [req.params.id], (err, rows) => {
    if (err) {
      throw err;
    }
    let user = rows[0];

    response.name = user.Vorname + " " + user.Nachname;
    response.email = user.email;
    response.website = user.website;

    res.json(response);
  });
});

router.post("/", (req, res) => {

  let sql = 'INSERT INTO Users(Vorname, Nachname, email) VALUES(?, ?, ?)';
  db.run(sql, [req.body.firstn, req.body.lastn, req.body.email], err => {
    if (err) {
      console.error(err)
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;