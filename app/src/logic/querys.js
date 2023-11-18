import bcryptjs from "bcryptjs";
import { config } from "dotenv";

config();

export default class Querys {
    constructor() {
        this.URL = "http://localhost:4200";
        this.IsManager = false;
        this.user = {};
        this.workers = [];
        this.tables = [];
        this.products = [];
        this.REACT_APP_PASSWORD = "";
        this.encrypt(process.env.REACT_APP_PASSWORD).then(r => {
            this.REACT_APP_PASSWORD = r;
        });
    }

    // security
    async encrypt(text) {
        return await bcryptjs.hash(text, 10);
    }

    // users
    async verifiUser(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        let pt = await fetch(this.URL + "/verify/user", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                if (!r.user.manager) this.IsManager = true;
                this.user = r.user;
                fun();
            }
        });
    }

    // products
    async createProduct(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        data.manager = (this.IsManager) ? this.user._id : this.user.manager;

        let pt = await fetch(this.URL + "/create/product", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.products.push(r.newProduct);
                fun();
            }
        });
    }
    async getProducts(fun) {
        let data = {
            REACT_APP_PASSWORD: this.REACT_APP_PASSWORD,
            manager: (this.IsManager) ? this.user._id : this.user.manager
        }
        let pt = await fetch(this.URL + "/products/" + this.products.length, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
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
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        
        let pt = await fetch(this.URL + "/product", {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.products = this.products.map(tb => {
                    if (tb._id == r.product._id) return r.product;
                    return tb;
                });
                fun();
            }
        });
    }
    async deleteProduct(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        
        let pt = await fetch(this.URL + "/product", {
            method: "DELETE",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.products = this.products.filter(tb => tb._id != r.found);
                fun();
            }
        });
    }

    // tables
    async createTable(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        data.manager = (this.IsManager) ? this.user._id : this.user.manager;

        let pt = await fetch(this.URL + "/create/table", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.tables.push(r.newTable);
                fun();
            }
        });
    }
    async getTables(fun) {
        let data = {
            REACT_APP_PASSWORD: this.REACT_APP_PASSWORD,
            manager: (this.IsManager) ? this.user._id : this.user.manager
        }
        let pt = await fetch(this.URL + "/tables/" + this.tables.length, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                if (r.tables.length) {
                    this.tables.push(...r.tables);
                    fun();
                } else fun(false, "No hay más mesas por cargar");
            }
        });
    }
    async editTable(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        
        let pt = await fetch(this.URL + "/table", {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.tables = this.tables.map(tb => {
                    if (tb._id == r.table._id) return r.table;
                    return tb;
                });
                fun();
            }
        });
    }
    async deleteTable(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        
        let pt = await fetch(this.URL + "/table", {
            method: "DELETE",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.tables = this.tables.filter(tb => tb._id != r.found);
                fun();
            }
        });
    }

    // workers
    async createWorker(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        data.manager = (this.IsManager) ? this.user._id : this.user.manager;

        let pt = await fetch(this.URL + "/create/worker", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.workers.push(r.newWorker);
                fun();
            }
        });
    }
    async getWorkers(fun) {
        let data = {
            REACT_APP_PASSWORD: this.REACT_APP_PASSWORD,
            manager: (this.IsManager) ? this.user._id : this.user.manager
        }
        let pt = await fetch(this.URL + "/workers/" + this.workers.length, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
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
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        
        let pt = await fetch(this.URL + "/worker", {
            method: "PUT",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.workers = this.workers.map(tb => {
                    if (tb._id == r.worker._id) return r.worker;
                    return tb;
                });
                fun();
            }
        });
    }
    async deleteWorker(data, fun) {
        data.REACT_APP_PASSWORD = this.REACT_APP_PASSWORD;
        
        let pt = await fetch(this.URL + "/worker", {
            method: "DELETE",
            mode: "cors",
            body: JSON.stringify(data)
        });
        pt.json().then(r => {
            if (r.not_found) fun(r.not_found);
            else {
                this.workers = this.workers.filter(tb => tb._id != r.found);
                fun();
            }
        });
    }
}