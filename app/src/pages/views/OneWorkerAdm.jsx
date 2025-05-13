import React from "react";
import { IconContext } from "react-icons";
import { FaPen, FaTrash } from "react-icons/fa";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import SideBoardFloat from "./components/SideBoardFloat";
import BotonAcc from "./components/BotonAcc";
import List from "./components/List";

function OneWorkerAdm(props) {
  const addWorkerAdm = () => {
    props.goToView("addWorkerAdm", {
      invertView: true,
      worker: props.worker,
    });
  };

  const deleteWorker = () => {
    const pre = window.confirm("¿Desea eliminar este trabajador?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        const data = { _id: props.worker._id };

        props.querys.deleteWorker(data, (somethingWrong) => {
          if (somethingWrong) {
            alert.show("Algo ha salido mal, comprueba la conexión a internet");
            fun(false, props.worker);
          } else fun("principalViewAdm", 1);
        });
      });
    }
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack onClick={() => props.goToView("principalViewAdm", 1)} />

      <div className="flexRowCenter">
        <h1> {props.worker.name} </h1>
      </div>
      <List
        list={[props.worker.hierarchy, props.worker.email, props.worker.phone]}
      />

      <div className="flexRowCenter">
        <div className="flexRowBetween min300">
          <BotonAcc onClick={addWorkerAdm}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaPen />
            </IconContext.Provider>
          </BotonAcc>

          <BotonAcc onClick={deleteWorker}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaTrash />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OneWorkerAdm;
