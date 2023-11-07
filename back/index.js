const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.LINK_DB)
    .then(e => console.log("Data base is connected"))
    .catch(error => console.log("Something is wrong", error));

const managerPassword = require("./files/managerPassword");

app.listen(3000);