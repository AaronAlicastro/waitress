import React, { Component } from "react";
import PrincipalViewAdm from "./pages/PrincipalViewAdm";
import OneItemAdm from "./pages/OneItemAdm";
import OneWorkerAdm from "./pages/OneWorkerAdm";
import OneTableAdm from "./pages/OneTableAdm";
import AddProductAdm from "./pages/AddProductAdm";
import AddWorkerAdm from "./pages/AddWorkerAdm";
import AddTableAdm from "./pages/AddTableAdm";

let dataBase = {
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
  ]
}

class App extends Component {
  constructor(props) {
    super(props);
    this.sufijo = "Adm";
    this.aVer = window.localStorage.getItem("viewActual") || "principalViewAdm";

    this.ventanas = {
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
      addProductAdm: (lastView) => <AddProductAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,
      addWorkerAdm: (lastView) => <AddWorkerAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />,
      addTableAdm: (lastView) => <AddTableAdm
        lastView={lastView}
        goToView={(view, dataView) => this.goToView(view, dataView)}
      />
    }

    if (this.aVer == "oneItemAdm") this.aVer = "principalViewAdm";
    else if (this.aVer == "oneWorkerAdm") this.aVer = "principalViewAdm";

    this.state = {
      lastView: {
        view: "principalView" + this.sufijo,
        dataView: {}
      },
      view: "principalViewAdm",
      // view: this.aVer,
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