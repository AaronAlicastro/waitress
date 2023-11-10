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
const schema_products = require("./files/db_schemas/products");
const schema_tables = require("./files/db_schemas/tables");

// users
app.post("/verify/user", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let [manager] = await schema_managers.find({ email: data.email });
            let [worker] = await schema_workers.find({ email: data.email });
            if (manager) {
                if (await managerPassword.compare(data.password, manager.password)) {
                    res.send({ user: manager });
                } else res.send({ not_found: true });
            }
            else if (worker) {
                if (await managerPassword.compare(data.password, worker.password)) {
                    res.send({ user: worker });
                } else res.send({ not_found: true });
            } else res.send({ not_found: true });
        } else res.send({ not_found: true });
    });
});
app.post("/edit/user", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let [manager] = await schema_managers.find({ email: data.email });
            let [worker] = await schema_workers.find({ email: data.email });
            if (manager) {
                manager.password = await managerPassword.encrypt(data.password);
                await manager.save();
                res.send({ found: true })
            }
            else if (worker) {
                worker.password = await managerPassword.encrypt(data.password);
                await worker.save();
                res.send({ found: true })
            } else res.send({ not_found: true });
        } else res.send({ not_found: true });
    });
});

// products
app.post("/create/product", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let newProduct = new schema_products(data);
            await newProduct.save();
            res.send({ newProduct });
        } else res.send({ not_found: true });
    });
});
app.post("/products/:page", (req, res) => {
    req.addListener("data", async data => {
        let page = parseInt(req.params.page);
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let products = await schema_products.find({ manager: data.manager }).skip(page).limit(10);
            res.send({ products });
        } else res.send({ not_found: true });
    });
});

// tables
app.post("/create/table", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let newTable = new schema_tables(data);
            await newTable.save();
            res.send({ newTable });
        } else res.send({ not_found: true });
    });
});
app.post("/tables/:page", (req, res) => {
    req.addListener("data", async data => {
        let page = parseInt(req.params.page);
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let tables = await schema_tables.find({ manager: data.manager }).skip(page).limit(10);
            res.send({ tables });
        } else res.send({ not_found: true });
    });
});

// workers from adm interface
app.post("/create/worker", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let newWorker = new schema_workers(data);
            await newWorker.save();
            res.send({ newWorker });
        } else res.send({ not_found: true });
    });
});
app.post("/workers/:page", (req, res) => {
    req.addListener("data", async data => {
        let page = parseInt(req.params.page);
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let workers = await schema_workers.find({ manager: data.manager }).skip(page).limit(10);
            res.send({ workers });
        } else res.send({ not_found: true });
    });
});

app.listen(4200);