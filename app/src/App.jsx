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
import EditOrDeleteOrder from "./pages/views/EditOrDeleteOrder";
import EditUser from "./pages/views/EditUser";

class App extends Component {
  constructor(props) {
    super(props);
    this.aVer = "welcome";
    this.querys = new Querys();

    this.ventanas = {
      // loading
      loading: () => <Loading />,

      // welcome
      welcome: () => (
        <Welcome
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
        />
      ),

      // users
      editUser: (lastView) => (
        <EditUser
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
        />
      ),

      // adm
      principalViewAdm: (_, seleccion) => (
        <PrincipalViewAdm
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
          seleccion={seleccion}
        />
      ),
      oneItemAdm: (lastView, item) => (
        <OneItemAdm
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          product={item}
          querys={this.querys}
        />
      ),
      oneWorkerAdm: (lastView, worker) => (
        <OneWorkerAdm
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          worker={worker}
          querys={this.querys}
        />
      ),
      oneTableAdm: (lastView, table) => (
        <OneTableAdm
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          table={table}
          querys={this.querys}
        />
      ),
      addWorkerAdm: (lastView, data) => (
        <AddWorkerAdm
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          invertView={data.invertView}
          worker={data.worker}
          querys={this.querys}
        />
      ),
      addTableAdm: (lastView, data) => (
        <AddTableAdm
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          invertView={data.invertView}
          table={data.table}
          querys={this.querys}
        />
      ),
      addProductAdm: (_, data) => (
        <AddProductAdm
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          invertView={data.invertView}
          ingres={data.ingres}
          product={data.product}
          querys={this.querys}
        />
      ),
      ingreToProduct: (lastView, data) => (
        <IngreToProduct
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          invertView={data.invertView}
          ingres={data.ingres}
          product={data.product}
          userName={this.querys.user.name}
          userId={this.querys.user._id}
        />
      ),

      // workers
      principalViewWorker: () => (
        <PrincipalViewWorker
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
        />
      ),
      tableListener: () => (
        <TableListener
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
        />
      ),
      addProductToTable: (_, data) => (
        <AddProductToTable
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
          productsAsked={data.productsAsked || []}
          total={data.total || 0}
        />
      ),
      editProctToOrder: (lastView, data) => (
        <EditProctToOrder
          lastView={lastView}
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          userName={this.querys.user.name}
          userId={this.querys.user._id}
          productChoosen={data.productChoosen}
          productsAsked={data.productsAsked}
          total={data.total || 0}
        />
      ),
      editOrDeleteOrder: (_, data) => (
        <EditOrDeleteOrder
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
          orderChoosen={data.orderChoosen}
          orderChoosen_index={data.orderChoosen_index}
        />
      ),
      finalCheck: (_, data) => (
        <FinalCheck
          goToView={(view, dataView, fun) =>
            this.putViewCarga(view, dataView, fun)
          }
          querys={this.querys}
        />
      ),
    };

    this.state = {
      lastView: {
        view: this.aVer,
        dataView: {},
      },
      view: this.aVer,
      dataView: {},
    };
  }

  setWindow(vista, dataView) {
    this.setState({
      lastView: {
        view: this.state.view,
        dataView: this.state.dataView,
      },
      view: vista,
      dataView,
    });
  }

  putViewCarga(vista, dataView, fun) {
    if (vista) this.setWindow(vista, dataView);
    else {
      const actualView = this.state.view;
      this.setState({ view: "loading" });
      fun((vista2, dataView2) => {
        setTimeout(() => this.setWindow(vista2 || actualView, dataView2), 300);
      });
    }
  }

  render() {
    return this.ventanas[this.state.view](
      this.state.lastView,
      this.state.dataView
    );
  }
}

export default App;
