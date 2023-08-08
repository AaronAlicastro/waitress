import React, { Component } from "react";
import PrincipalViewAdm from "./pages/PrincipalViewAdm";
import OneItemAdm from "./pages/OneItemAdm";
import OneWorkerAdm from "./pages/OneWorkerAdm";
import OneTableAdm from "./pages/OneTableAdm";

let dataBase = {
  productos: [
    {
      _id: "001",
      name: "Hamburguesa",
      valor: 200,
      ingre: [
        { name: "queso", valor: 0 },
        { name: "pan", valor: 0 },
        { name: "carne", valor: 200 }
      ]
    },
    {
      _id: "002",
      name: "Perro caliente",
      valor: 500,
      ingre: [
        { name: "queso", valor: 0 },
        { name: "pan", valor: 0 },
        { name: "salchicha", valor: 500 }
      ]
    }
  ],
  workers: [
    {
      _id: "worker_1",
      name: "aaron",
      email: "aaron@gmail.com",
      password: "1234",
      phone: "33443434434"
    },
    {
      _id: "worker_2",
      name: "miguel",
      email: "miguel@gmail.com",
      password: "1234miguel",
      phone: "5456468468464846"
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
    this.aVer = window.localStorage.getItem("viewActual") || "principalViewAdm";

    this.ventanas = {
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
      />
    }

    if (this.aVer == "oneItemAdm") this.aVer = "principalViewAdm";
    else if (this.aVer == "oneWorkerAdm") this.aVer = "principalViewAdm";

    this.state = {
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