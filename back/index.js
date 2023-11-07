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
const schema_managers = require("./files/db_schemas/managers");
const schema_workers = require("./files/db_schemas/workers");

app.post("/verify/user", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        let [manager] = await schema_managers.find({ email: data.email });
        let [worker] = await schema_workers.find({ email: data.email });
        if (manager) {
            if (managerPassword.compare(data.password, manager.password)) {
                res.send({ manager });
            }
        }
        else if (worker) {
            if (managerPassword.compare(data.password, worker.password)) {
                res.send({ worker });
            }
        }
        
        res.send({ not_found: true });
    });
});

app.listen(4200);