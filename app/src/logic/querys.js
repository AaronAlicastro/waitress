import bcryptjs from "bcryptjs";
import GeneralRequestConfig from "./generalRequestConfig";

export default class Querys {
  constructor() {
    // general
    this.URL = process.env.REACT_APP_URL_BACK;
    this.IsManager = false;
    this.generalRequestConfig = null;

    this.encrypt(process.env.REACT_APP_PASSWORD).then((service_key) => {
      this.generalRequestConfig = new GeneralRequestConfig(service_key);
    });

    // user
    this.user = {};

    // workers
    this.workers = [];

    // tables
    this.tables = [];
    this.tableChoosen = {};

    // products
    this.products = [];

    // orders
    this.orders = [];
  }

  // security
  async encrypt(text) {
    return await bcryptjs.hash(text, 10);
  }

  // users
  async verifiUser(data, fun) {
    const pt = await fetch(
      this.URL + "/verify/user",
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.user = r.user;
        if (!r.user.manager) {
          this.IsManager = true;
          fun(false, this.IsManager);
        } else fun(false, this.IsManager);
      }
    });
  }

  async editUser(data, fun) {
    const pt = await fetch(
      this.URL + "/user",
      this.generalRequestConfig.setUp("PUT", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else fun();
    });
  }

  async deleteUser(userId, fun) {
    const pt = await fetch(
      this.URL + "/user",
      this.generalRequestConfig.setUp("DELETE", { _id: userId })
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else fun();
    });
  }

  // products
  async createProduct(data, fun) {
    data.manager = this.IsManager ? this.user._id : this.user.manager;

    const pt = await fetch(
      this.URL + "/create/product",
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.products.push(r.newProduct);
        fun();
      }
    });
  }

  async getProducts(fun) {
    let data = {
      manager: this.IsManager ? this.user._id : this.user.manager,
    };

    const pt = await fetch(
      this.URL + "/products/" + this.products.length,
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        if (r.products.length) {
          this.products.push(...r.products);
          fun();
        } else fun(false, "No hay más productos por cargar");
      }
    });
  }

  async editProduct(data, fun) {
    const pt = await fetch(
      this.URL + "/product",
      this.generalRequestConfig.setUp("PUT", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        const indexEdited = this.products.findIndex(
          (pr) => pr._id === r.product._id
        );

        this.products[indexEdited] = r.product;
        fun();
      }
    });
  }

  async deleteProduct(data, fun) {
    const pt = await fetch(
      this.URL + "/product",
      this.generalRequestConfig.setUp("DELETE", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        const indexDeleted = this.products.findIndex(
          (pr) => pr._id === data._id
        );

        this.products.splice(indexDeleted, 1);
        fun();
      }
    });
  }

  // orders
  async createOrder(data, fun) {
    const pt = await fetch(
      this.URL + "/create/order",
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.orders.push(r.newOrder);
        fun();
      }
    });
  }

  async editOrder(data, fun) {
    const pt = await fetch(
      this.URL + "/order",
      this.generalRequestConfig.setUp("PUT", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else fun();
    });
  }

  async deleteOrder(data, fun) {
    const pt = await fetch(
      this.URL + "/order",
      this.generalRequestConfig.setUp("DELETE", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else fun();
    });
  }

  async deleteOrdersOfTable(data, fun) {
    const pt = await fetch(
      this.URL + "/orders/table",
      this.generalRequestConfig.setUp("DELETE", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.orders.splice(0);
        fun();
      }
    });
  }

  // tables
  async createTable(data, fun) {
    data.manager = this.IsManager ? this.user._id : this.user.manager;

    const pt = await fetch(
      this.URL + "/create/table",
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.tables.push(r.newTable);
        fun();
      }
    });
  }

  async getTables(fun) {
    let data = {
      manager: this.IsManager ? this.user._id : this.user.manager,
    };

    const pt = await fetch(
      this.URL + "/tables/" + this.tables.length,
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        if (r.tables.length) {
          this.tables.push(...r.tables);
          fun();
        } else fun(false, "No hay más mesas por cargar");
      }
    });
  }

  async getOneTable(tableId, fun) {
    let data = {
      _id: tableId,
      manager: this.user.manager,
    };

    const pt = await fetch(
      this.URL + "/table",
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.tableChoosen = r.table;
        this.products = r.products;
        this.orders = r.orders;
        fun();
      }
    });
  }

  async editTable(data, fun) {
    const pt = await fetch(
      this.URL + "/table",
      this.generalRequestConfig.setUp("PUT", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.tables = this.tables.map((tb) => {
          if (tb._id === r.table._id) return r.table;
          return tb;
        });
        fun();
      }
    });
  }

  async deleteTable(data, fun) {
    const pt = await fetch(
      this.URL + "/table",
      this.generalRequestConfig.setUp("DELETE", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        const indexDeleted = this.tables.findIndex((tb) => tb._id === data._id);

        this.tables.splice(indexDeleted, 1);
        fun();
      }
    });
  }

  // workers
  async createWorker(data, fun) {
    data.manager = this.IsManager ? this.user._id : this.user.manager;
    data.password = await this.encrypt(data.password);

    const pt = await fetch(
      this.URL + "/create/worker",
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        this.workers.push(r.newWorker);
        fun();
      }
    });
  }

  async getWorkers(fun) {
    let data = {
      manager: this.IsManager ? this.user._id : this.user.manager,
    };

    const pt = await fetch(
      this.URL + "/workers/" + this.workers.length,
      this.generalRequestConfig.setUp("POST", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        if (r.workers.length) {
          this.workers.push(...r.workers);
          fun();
        } else fun(false, "No hay más trabajadores por cargar");
      }
    });
  }

  async editWorker(data, fun) {
    const pt = await fetch(
      this.URL + "/worker",
      this.generalRequestConfig.setUp("PUT", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        const indexEdited = this.workers.findIndex(
          (wr) => wr._id === r.worker._id
        );

        this.workers[indexEdited] = r.worker;
        fun();
      }
    });
  }

  async deleteWorker(data, fun) {
    const pt = await fetch(
      this.URL + "/worker",
      this.generalRequestConfig.setUp("DELETE", data)
    );

    pt.json().then((r) => {
      if (r.not_found) fun(r.not_found);
      else {
        const indexDeleted = this.workers.findIndex(
          (wr) => wr._id === data._id
        );

        this.workers.splice(indexDeleted, 1);
        fun();
      }
    });
  }
}
