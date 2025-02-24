import React from "react";
import { IconContext } from "react-icons";
import { FaPlus } from "react-icons/fa";
import { useAlert } from "react-alert";
import SideBoardFloat from "./views/components/SideBoardFloat";
import NavBurguer from "./views/components/NavBurguer";
import Footer from "./views/components/Footer";
import BotonAcc from "./views/components/BotonAcc";
import List from "./views/components/List";

function PrincipalViewAdm(props) {
  const alert = useAlert();

  const list_db_response = (fun, somethingWrong, message, field) => {
    if (message) {
      alert.show(message);
      fun(false, field);
    } else if (somethingWrong) {
      alert.show("Algo ha salido mal, revise su internet");
    } else fun(false, field);
  };

  const constAddButton = (fun) => {
    return (
      <div className="flexRowCenter">
        <BotonAcc onClick={fun}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaPlus />
          </IconContext.Provider>
        </BotonAcc>
      </div>
    );
  };
  const constLoadButton = (fun) => {
    return (
      <div className="infoGeneral_details flexRowCenter">
        <button className="general_btn" onClick={fun}>
          Cargar
        </button>
      </div>
    );
  };
  const constThereAreNoCharges = (title, fun) => {
    return (
      <div className="infoGeneral_details">
        <span>{title}</span>
        {constLoadButton(fun)}
      </div>
    );
  };

  const loadProducts = () => {
    props.goToView(false, null, (fun) => {
      props.querys.getProducts((somethingWrong, message) =>
        list_db_response(fun, somethingWrong, message, 0)
      );
    });
  };
  const loadWorkers = () => {
    props.goToView(false, null, (fun) => {
      props.querys.getWorkers((somethingWrong, message) =>
        list_db_response(fun, somethingWrong, message, 1)
      );
    });
  };
  const loadTables = () => {
    props.goToView(false, null, (fun) => {
      props.querys.getTables((somethingWrong, message) =>
        list_db_response(fun, somethingWrong, message, 2)
      );
    });
  };

  const seeProducts = () => {
    if (props.querys.products.length) {
      return (
        <List
          list={props.querys.products.map((pr) => pr.name)}
          onClick={(productName) => {
            const product = props.querys.products.find(
              (pr) => pr.name === productName
            );

            props.goToView("oneItemAdm", product);
          }}
          constData={constLoadButton(loadProducts)}
        />
      );
    }

    return constThereAreNoCharges("No hay productos cargados", loadProducts);
  };
  const seeWorkers = () => {
    if (props.querys.workers.length) {
      return (
        <List
          list={props.querys.workers.map((wr) => wr.name)}
          onClick={(workerName) => {
            const worker = props.querys.workers.find(
              (wr) => wr.name === workerName
            );

            props.goToView("oneWorkerAdm", worker);
          }}
          constData={constLoadButton(loadWorkers)}
        />
      );
    }

    return constThereAreNoCharges("No hay trabajadores cargados", loadWorkers);
  };
  const seeTables = () => {
    if (props.querys.tables.length) {
      return (
        <List
          list={props.querys.tables.map((tb) => tb.number)}
          onClick={(tableNumber) => {
            const table = props.querys.tables.find(
              (tb) => tb.number === tableNumber
            );

            props.goToView("oneTableAdm", table);
          }}
          constData={constLoadButton(loadTables)}
        />
      );
    }

    return constThereAreNoCharges("No hay trabajadores cargados", loadTables);
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <NavBurguer
        Pseleccion={props.seleccion}
        opciones={["Productos", "Trabajadores", "Mesas"]}
        content={[
          <div>
            {seeProducts()}
            {constAddButton(() => props.goToView("addProductAdm"))}
          </div>,
          <div>
            {seeWorkers()}
            {constAddButton(() => props.goToView("addWorkerAdm"))}
          </div>,
          <div>
            {seeTables()}
            {constAddButton(() => props.goToView("addTableAdm"))}
          </div>,
        ]}
      />

      <Footer />
    </div>
  );
}

export default PrincipalViewAdm;
