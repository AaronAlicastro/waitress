import React from "react";
import { IconContext } from "react-icons";
import { FaPen, FaTrash } from "react-icons/fa";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import SideBoardFloat from "./components/SideBoardFloat";
import BotonAcc from "./components/BotonAcc";
import QrMaker from "./components/QrMaker";

function OneTableAdm(props) {
  const STYLE = {
    spanFlexPadding: { padding: "0" },
  };
  const addTableAdm = () => {
    props.goToView("addTableAdm", {
      invertView: true,
      table: props.table,
    });
  };

  const deleteTable = () => {
    const pre = window.confirm("¿Desea eliminar esta mesa?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        const data = { _id: props.table._id };

        props.querys.deleteTable(data, (somethingWrong) => {
          if (somethingWrong) {
            alert.show("Algo ha salido mal, comprueba la conexión a internet");
            fun(false, props.table);
          } else fun("principalViewAdm", 2);
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
      <FloatBack onClick={() => props.goToView("principalViewAdm", 2)} />

      <div className="flexRowCenter">
        <div className="flexRowBetween min300">
          <BotonAcc onClick={addTableAdm}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaPen />
            </IconContext.Provider>
          </BotonAcc>

          <BotonAcc onClick={deleteTable}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaTrash />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      </div>

      <div className="flexRowCenter">
        <h3> {props.table.number} </h3>
      </div>
      <QrMaker value={props.table._id} />
      <div className="flexColumnStart">
        <span style={{ fontSize: "var(--font_small)" }}>{props.table._id}</span>
      </div>

      <Footer />
    </div>
  );
}

export default OneTableAdm;
