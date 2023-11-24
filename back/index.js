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
    const verifyAndSend = async (password, user) => {
        if (await managerPassword.compare(password, user.password)) {
            res.send({ user });
        } else res.send({ not_found: true });
    }

    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let [manager] = await schema_managers.find({ email: data.email });
            let [worker] = await schema_workers.find({ email: data.email });
            if (manager) verifyAndSend(data.password, manager);
            else if (worker) verifyAndSend(data.password, worker);
            else res.send({ not_found: true });
        } else res.send({ not_found: true });
    });
});
app.put("/user", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let manager = await schema_managers.findById(data._id);
            if (manager) {
                manager.name = data.name;
                manager.email = data.email;
                manager.password = await managerPassword.encrypt(data.password);
                await manager.save();
                res.send({ user: manager })
            }
            else res.send({ not_found: true });
        } else res.send({ not_found: true });
    });
});
app.delete("/user", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let manager = await schema_managers.findById( data._id );
            let worker = await schema_workers.findById( data._id );
            if (manager) {
                await manager.remove();
                res.send({ found: true });
            }
            else if (worker) {
                await worker.remove();
                res.send({ found: true });
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
app.put("/product", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let product = await schema_products.findById(data._id);
            product.name = data.name;
            product.price = data.price;
            product.ingre = data.ingre;
            await product.save();
            res.send({ product });
        } else res.send({ not_found: true });
    });
});
app.delete("/product", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            await schema_products.findByIdAndDelete(data._id);
            res.send({ found: data._id });
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
app.put("/table", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let table = await schema_tables.findById(data._id);
            table.number = data.number;
            await table.save();
            res.send({ table });
        } else res.send({ not_found: true });
    });
});
app.delete("/table", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            await schema_tables.findByIdAndDelete(data._id);
            res.send({ found: data._id });
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
app.put("/worker", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            let worker = await schema_workers.findById(data._id);
            worker.name = data.name;
            worker.phone = data.phone;
            worker.email = data.email;
            worker.password = await managerPassword.encrypt(data.password);
            await worker.save();
            res.send({ worker });
        } else res.send({ not_found: true });
    });
});
app.delete("/worker", (req, res) => {
    req.addListener("data", async data => {
        data = JSON.parse(data.toString());
        if (await managerPassword.compare(process.env.APP_PASSWORD, data.REACT_APP_PASSWORD)) {
            await schema_workers.findByIdAndDelete(data._id);
            res.send({ found: data._id });
        } else res.send({ not_found: true });
    });
});

app.listen(4200);