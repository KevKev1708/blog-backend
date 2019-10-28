let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("database.sqlite");
let fehler = require("./errors")

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*")
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", express.static('static'));

app.get("/blogs", (req, res) => {

    let sql = `SELECT title, body, author FROM posts`;
    db.all(sql, [], (err, rows) => {

        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

app.get("/blogs/:id", (req, res) => {

    let sql = `SELECT title, body, author FROM posts`;
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

app.post("/blogs", (req, res) => {

    let sql = 'INSERT INTO posts(title, body, author) VALUES(?, ?, ?)';
    db.run(sql, [req.body.title, req.body.body, req.body.author], err => {
        if (err) {
            res.json({ success: false });
        }
        res.json({ success: true });
    });
});

app.listen(8080);