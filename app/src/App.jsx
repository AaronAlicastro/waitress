import React, { Component } from "react";
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
    this.aVer = window.localStorage.getItem("viewActual") || "welcome";

    this.ventanas = {
      // welcome
      welcome: () => <Welcome
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,

      // adm
      principalViewAdm: () => <PrincipalViewAdm
        goToView={(view, dataView) => this.goToView(view, dataView)}
        productos={dataBase.productos}
        workers={dataBase.workers}
        tables={dataBase.tables}
      />,
      oneItemAdm: (lastView, item) => <OneItemAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        producto={item}
      />,
      oneWorkerAdm: (lastView, worker) => <OneWorkerAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        worker={worker}
      />,
      oneTableAdm: (lastView, table) => <OneTableAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        table={table}
      />,
      addWorkerAdm: (lastView) => <AddWorkerAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,
      addTableAdm: (lastView) => <AddTableAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,
      addProductAdm: (lastView) => <AddProductAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,
      ingreToProduct: (lastView, ingres) => <IngreToProduct
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        ingres={ingres}
      />,

      // workers
      principalViewWorker: () => <PrincipalViewWorker
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,
      tableListener: (lastView) => <TableListener
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        orders={dataBase.orders}
        tableChoosen={{ _id: "table_1" }}
        products={dataBase.productos}
      />,
      addProductToTable: (lastView, data) => <AddProductToTable
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        tableChoosen={data.tableChoosen}
        products={data.products}
      />,
      editProctToOrder: (lastView, data) => <EditProctToOrder
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
        tableChoosen={data.tableChoosen}
        products={data.products}
        productChoosen={data.productChoosen}
      />,
      finalCheck: (_, data) => <FinalCheck
        goToView={(view, dataView) => this.goToView(view, dataView)}
        total={data.total}
        tableChoosen={data.tableChoosen}
      />
    }

    if (this.aVer == "oneItemAdm") this.aVer = "principalViewAdm";
    else if (this.aVer == "oneWorkerAdm") this.aVer = "principalViewAdm";

    this.state = {
      lastView: {
        // view: "principalViewWorker",
        view: this.aVer,
        dataView: {}
      },
      // view: "principalViewWorker",
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
  // renderViewCarga(vista, fun) {
  //   if (vista) this.goToView(vista);
  //   else {
  //     let actualView = this.state.view;
  //     this.setState({ view: "viewCarga" });
  //     fun(vista2 => {
  //       setTimeout(() => this.goToView(vista2 || actualView), 300);
  //     });
  //   }
  // }

  render() {
    return this.ventanas[this.state.view](this.state.lastView, this.state.dataView);
  }
}

export default App;