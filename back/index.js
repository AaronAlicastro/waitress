const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

// configs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// data base connection
mongoose
  .connect(process.env.LINK_DB)
  .then(() => console.log("Data base is connected"))
  .catch((error) => console.log("Something is wrong", error));

// data base schemas
const schema_managers = require("./files/db_schemas/managers");
const schema_workers = require("./files/db_schemas/workers");
const schema_tables = require("./files/db_schemas/tables");
const schema_products = require("./files/db_schemas/products");
const schema_orders = require("./files/db_schemas/orders");

// managers
const {
  compare,
  verifyServer,
  serviceErrorHandler,
} = require("./files/logic/queriesManager");

// users
app.post("/verify/user", (req, res) => {
  const { service_key } = req.headers;
  const { email, password } = req.body;

  const verifyPasswords = async (user) => {
    if (await compare(password, user.password)) res.send({ user });
    else serviceErrorHandler.not_found(res);
  };

  verifyServer(
    service_key,
    async () => {
      const manager = await schema_managers.findOne({ email });
      const worker = await schema_workers.findOne({ email });

      if (manager) verifyPasswords(manager);
      else if (worker) verifyPasswords(worker);
      else serviceErrorHandler.not_found(res);
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.put("/user", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const manager = await schema_managers.findById(req.body._id);

      manager.name = req.body.name;
      manager.email = req.body.email;
      manager.password = req.body.password;

      await manager.save();
      res.send({ edited: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.delete("/user", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const manager = await schema_managers.findByIdAndDelete(req.body._id);
      const worker = await schema_workers.findByIdAndDelete(req.body._id);

      if (manager || worker) res.send({ found: true });
      else serviceErrorHandler.not_found(res);
    },
    () => serviceErrorHandler.not_found(res)
  );
});

// products
app.post("/create/product", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const newProduct = new schema_products(req.body);
      await newProduct.save();

      res.send({ newProduct });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.post("/products/:page", (req, res) => {
  const { service_key } = req.headers;
  const page = parseInt(req.params.page);

  verifyServer(
    service_key,
    async () => {
      const products = await schema_products
        .find({ manager: req.body.manager })
        .skip(page)
        .limit(10);

      res.send({ products });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.put("/product", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const product = await schema_products.findById(req.body._id);

      product.isPreparable = req.body.isPreparable;
      product.name = req.body.name;
      product.price = req.body.price;
      product.ingre = req.body.ingre;

      await product.save();
      res.send({ product });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.delete("/product", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      await schema_products.findByIdAndDelete(req.body._id);
      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

// orders
app.post("/create/order", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const newOrder = new schema_orders(req.body);
      await newOrder.save();
      res.send({ newOrder });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.put("/order", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const order = await schema_orders.findById(req.body._id);

      order.productsAsked = req.body.productsAsked;
      order.total = req.body.total;

      await order.save();
      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.put("/oneProductAsked/status", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      await schema_orders.findOneAndUpdate(
        {
          "productsAsked._id": req.body._id,
        },
        {
          $set: {
            "productsAsked.$.status": req.body.status,
          },
        }
      );

      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.delete("/order", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      await schema_orders.findByIdAndDelete(req.body._id);
      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.delete("/orders/table", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      await schema_orders.deleteMany(
        { manager: req.body.manager, table: req.body.table },
        { multi: true }
      );

      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

// orders ~ workers listening
app.get("/supervisor/pendingOrders/:idManager", (req, res) => {
  const { service_key } = req.headers;
  const idManager = req.params.idManager;

  verifyServer(
    service_key,
    async () => {
      const ordenDataList = await schema_orders.find({
        manager: idManager,
        $or: [
          { "productsAsked.status": "pendiente" },
          { "productsAsked.status": "preparando" },
        ],
      });

      res.send({ ordenDataList });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.get("/waitress/finishedOrders/:idManager", (req, res) => {
  const { service_key } = req.headers;
  const idManager = req.params.idManager;

  verifyServer(
    service_key,
    async () => {
      const ordenDataList = await schema_orders.find({
        manager: idManager,
        "productsAsked.status": "terminado",
      });

      res.send({ ordenDataList });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

// tables
app.post("/create/table", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const newTable = new schema_tables(req.body);
      await newTable.save();
      res.send({ newTable });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.get("/tables/:idManager", (req, res) => {
  const { service_key } = req.headers;
  const idManager = req.params.idManager;

  verifyServer(
    service_key,
    async () => {
      const tables = await schema_tables.find({ manager: idManager });
      res.send({ tables });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.post("/tables/:page", (req, res) => {
  const { service_key } = req.headers;
  const page = parseInt(req.params.page);

  verifyServer(
    service_key,
    async () => {
      const tables = await schema_tables
        .find({ manager: req.body.manager })
        .skip(page)
        .limit(10);

      res.send({ tables });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.post("/tableBySupervisor", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const table = await schema_tables.findById(req.body._id);

      if (table) {
        const orders = await schema_orders.find({
          manager: req.body.manager,
          table: req.body._id,
        });

        res.send({ table, orders });
      } else serviceErrorHandler.not_found(res);
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.post("/table", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const table = await schema_tables.findById(req.body._id);

      if (table) {
        const products = await schema_products.find({
          manager: req.body.manager,
        });
        const orders = await schema_orders.find({
          manager: req.body.manager,
          table: req.body._id,
        });

        res.send({ table, products, orders });
      } else serviceErrorHandler.not_found(res);
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.put("/table", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const table = await schema_tables.findById(req.body._id);

      table.number = req.body.number;
      table.customerName = req.body.customerName;
      table.customerPhone = req.body.customerPhone;

      await table.save();
      res.send({ table });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.delete("/table", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      await schema_tables.findByIdAndDelete(req.body._id);
      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

// workers ~ supervisors from adm interface
app.post("/create/worker", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const newWorker = new schema_workers(req.body);
      await newWorker.save();
      res.send({ newWorker });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.post("/workers/:page", (req, res) => {
  const { service_key } = req.headers;
  const page = parseInt(req.params.page);

  verifyServer(
    service_key,
    async () => {
      const workers = await schema_workers
        .find({ manager: req.body.manager })
        .skip(page)
        .limit(10);

      res.send({ workers });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.put("/worker", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      const worker = await schema_workers.findById(req.body._id);

      worker.hierarchy = req.body.hierarchy;
      worker.name = req.body.name;
      worker.phone = req.body.phone;
      worker.email = req.body.email;
      worker.password = req.body.password;

      await worker.save();
      res.send({ worker });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.delete("/worker", (req, res) => {
  const { service_key } = req.headers;

  verifyServer(
    service_key,
    async () => {
      await schema_workers.findByIdAndDelete(req.body._id);
      res.send({ found: true });
    },
    () => serviceErrorHandler.not_found(res)
  );
});

app.listen(4200);
