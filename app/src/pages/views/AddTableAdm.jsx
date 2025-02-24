import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import { useAlert } from "react-alert";

function AddTableAdm(props) {
  const alert = useAlert();
  const error = "Error, comprueba la conexión a internet";
  const tableToEdit = props.table || {};

  const createOrEdit = (entrences) => {
    props.goToView(false, {}, (fun) => {
      const handleError = (somethingWrong) => {
        if (somethingWrong) alert.show(error);
        fun("principalViewAdm", 2);
      };

      if (props.invertView) {
        entrences._id = props.table._id;
        props.querys.editTable(entrences, handleError);
      } else props.querys.createTable(entrences, handleError);
    });
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack
        onClick={() => {
          props.goToView(props.lastView.view, props.lastView.dataView);
        }}
      />

      <Forms
        id="form_EditTableAdm_form_createTableAdm"
        title={props.invertView ? "Editar mesa" : "Registrar Mesa"}
        campos={[
          {
            leyenda: "number",
            placeholder: "Número de mesa",
            type: "Number",
            value: tableToEdit.number,
          },
        ]}
        btn_text={props.invertView ? "Editar" : "Registrar"}
        onClick={createOrEdit}
      />

      <Footer />
    </div>
  );
}

export default AddTableAdm;
