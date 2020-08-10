const express = require("express");
const db = require("./database");
const fehler = require("./errors");

const router = express.Router();


router.get('/', (req, res) => {

  let sql = `SELECT id, title, body, author, userId FROM posts`;
  db.all(sql, [], (err, rows) => {

    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

router.get("/:id", (req, res) => {

  let sql = `SELECT id, title, body, author, userId FROM posts`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    if (rows[req.params.id] == undefined) {
      res.json(fehler);
    }
    res.json(rows[req.params.id]);
  });
});

router.delete("/:id", (req, res) => {

  let sql = 'DELETE FROM posts WHERE id = ?';
  db.run(sql, [req.params.id], err => {
    if (err) {
      console.error(err)
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;