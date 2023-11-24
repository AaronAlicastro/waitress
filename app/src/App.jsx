import React, { Component } from "react";
import Querys from "./logic/querys";
import PrincipalViewAdm from "./pages/PrincipalViewAdm";
import OneItemAdm from "./pages/views/OneItemAdm";
import OneWorkerAdm from "./pages/views/OneWorkerAdm";
import OneTableAdm from "./pages/views/OneTableAdm";
import AddWorkerAdm from "./pages/views/AddWorkerAdm";
import AddTableAdm from "./pages/views/AddTableAdm";
import AddProductAdm from "./pages/views/AddProductAdm";
import IngreToProduct from "./pages/views/IngreToProduct";
import PrincipalViewWorker from "./pages/PrincipalViewWorker";
import TableListener from "./pages/views/TableListener";
import AddProductToTable from "./pages/views/AddProductToTable";
import EditProctToOrder from "./pages/views/EditProctToOrder";
import FinalCheck from "./pages/views/FinalCheck";
import Welcome from "./pages/Welcome";
import Loading from "./pages/Loading";

let dataBase = {
  // adm
  productos: [
    {
      _id: "001",
      name: "Hamburguesa",
      value: 200,
      ingre: [
        { name: "queso", value: 0 },
        { name: "pan", value: 0 },
        { name: "carne", value: 200 }
      ]
    },
    {
      _id: "002",
      name: "Perro caliente",
      value: 500,
      ingre: [
        { name: "queso", value: 0 },
        { name: "pan", value: 0 },
        { name: "salchicha", value: 500 }
      ]
    }
  ],
  workers: [
    {
      _id: "worker_1",
      name: "aaron",
      phone: "33443434434",
      email: "aaron@gmail.com",
      password: "1234"
    },
    {
      _id: "worker_2",
      name: "miguel",
      phone: "5456468468464846",
      email: "miguel@gmail.com",
      password: "1234miguel"
    }
  ],
  tables: [
    {
      _id: "table_1",
      number: 1
    },
    {
      _id: "table_2",
      number: 2
    },
    {
      _id: "table_3",
      number: 3
    },
    {
      _id: "table_4",
      number: 4
    }
  ],

  // workers
  orders: [
    {
      number: 1,
      table: {
        _id: "table_1",
        number: 1
      },
      productsAsked: [
        {
          _id: "001",
          name: "Hamburguesa",
          value: 200,
          ingre: [
            { name: "queso", value: 0 },
            { name: "pan", value: 0 },
            { name: "carne", value: 200 }
          ],
          without: ["carne"]
        },
        {
          _id: "002",
          name: "Perro caliente",
          value: 500,
          ingre: [
            { name: "queso", value: 0 },
            { name: "pan", value: 0 },
            { name: "salchicha", value: 500 }
          ],
          without: []
        }
      ]
    },
    {
      number: 2,
      table: {
        _id: "table_3",
        number: 2
      },
      productsAsked: [
        {
          _id: "001",
          name: "Hamburguesa",
          value: 200,
          ingre: [
            { name: "queso", value: 0 },
            { name: "pan", value: 0 },
            { name: "carne", value: 200 }
          ],
          without: []
        }
      ]
    },
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.aVer = "welcome";
    this.querys = new Querys();

    this.ventanas = {
      // loading
      loading: () => <Loading />,

      // welcome
      welcome: () => <Welcome
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        querys={this.querys}
      />,

      // adm
      principalViewAdm: (_, seleccion) => <PrincipalViewAdm
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        querys={this.querys}
        seleccion={seleccion}
      />,
      oneItemAdm: (lastView, item) => <OneItemAdm
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        product={item}
        querys={this.querys}
      />,
      oneWorkerAdm: (lastView, worker) => <OneWorkerAdm
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        worker={worker}
        querys={this.querys}
      />,
      oneTableAdm: (lastView, table) => <OneTableAdm
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        table={table}
        querys={this.querys}
      />,
      addWorkerAdm: (lastView, data) => <AddWorkerAdm
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        invertView={data.invertView}
        worker={data.worker}
        querys={this.querys}
      />,
      addTableAdm: (lastView, data) => <AddTableAdm
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        invertView={data.invertView}
        table={data.table}
        querys={this.querys}
      />,
      addProductAdm: (_, data) => <AddProductAdm
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        invertView={data.invertView}
        ingres={data.ingres}
        product={data.product}
        querys={this.querys}
      />,
      ingreToProduct: (lastView, data) => <IngreToProduct
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        invertView={data.invertView}
        ingres={data.ingres}
        product={data.product}
        userName={this.querys.user.name}
        userId={this.querys.user._id}
      />,

      // workers
      principalViewWorker: () => <PrincipalViewWorker
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        querys={this.querys}
      />,
      tableListener: (lastView) => <TableListener
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        orders={dataBase.orders}
        tableChoosen={{ _id: "table_1" }}
        products={dataBase.productos}
        userName={this.querys.user.name}
        userId={this.querys.user._id}
      />,
      addProductToTable: (lastView, data) => <AddProductToTable
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        tableChoosen={data.tableChoosen}
        products={data.products}
        userName={this.querys.user.name}
        userId={this.querys.user._id}
      />,
      editProctToOrder: (lastView, data) => <EditProctToOrder
        lastView={lastView}
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        tableChoosen={data.tableChoosen}
        products={data.products}
        productChoosen={data.productChoosen}
        userName={this.querys.user.name}
        userId={this.querys.user._id}
      />,
      finalCheck: (_, data) => <FinalCheck
        goToView={(view, dataView, fun) => this.renderViewCarga(view, dataView, fun)}
        total={data.total}
        tableChoosen={data.tableChoosen}
        userName={this.querys.user.name}
        userId={this.querys.user._id}
      />
    }

    this.state = {
      lastView: {
        // view: "principalViewWorker",
        view: this.aVer,
        dataView: {}
      },
      view: this.aVer,
      dataView: {}
    }
  }

  goToView(vista, dataView) {
    window.localStorage.setItem("viewActual", vista);
    this.setState({
      lastView: {
        view: this.state.view,
        dataView: this.state.dataView
      },
      view: vista,
      dataView
    });
  }
  renderViewCarga(vista, dataView, fun) {
    if (vista) this.goToView(vista, dataView);
    else {
      let actualView = this.state.view;
      this.setState({ view: "loading" });
      fun((vista2, dataView2) => {
        setTimeout(() => this.goToView(vista2 || actualView, dataView2), 300);
      });
    }
  }

  render() {
    return this.ventanas[this.state.view](this.state.lastView, this.state.dataView);
  }
}

export default App;