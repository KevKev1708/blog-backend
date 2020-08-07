const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const posts = require('./posts');
const users = require('./users');


app.use('/users', users)
app.use('/posts', posts);



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8080);