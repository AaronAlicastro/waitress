import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import { useAlert } from "react-alert";

function AddWorkerAdm(props) {
  const alert = useAlert();
  const error = "Error, comprueba la conexión a internet";
  const workerToEdit = props.worker || {};

  const createOrEdit = (entrences) => {
    if (entrences.password1 === entrences.password2) {
      entrences.password = entrences.password1;
      delete entrences.password1;
      delete entrences.password2;

      props.goToView(false, null, (fun) => {
        const handleError = (somethingWrong) => {
          if (somethingWrong) alert.show(error);
          fun("principalViewAdm", 1);
        };

        if (props.invertView) {
          entrences._id = workerToEdit._id;
          props.querys.editWorker(entrences, handleError);
        } else props.querys.createWorker(entrences, handleError);
      });
    } else alert.show("Las contraseñas no coinciden");
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack
        onClick={() =>
          props.goToView(props.lastView.view, props.lastView.dataView)
        }
      />

      <Forms
        id="form_createWorkerAdm_or_edit"
        title={props.invertView ? "Editar trabajador" : "Registrar trabajador"}
        campos={[
          {
            leyenda: "hierarchy",
            type: "radio",
            checked: true,
            placeholder: "Mesero",
            value: "waitress",
          },
          {
            leyenda: "hierarchy",
            type: "radio",
            placeholder: "Supervisor",
            value: "supervisor",
          },
          {
            leyenda: "name",
            placeholder: "Nombre",
            value: workerToEdit.name,
          },
          {
            leyenda: "phone",
            placeholder: "Teléfono",
            type: "number",
            value: workerToEdit.phone,
          },
          {
            leyenda: "email",
            placeholder: "Correo",
            value: workerToEdit.email,
          },
          {
            leyenda: "password1",
            placeholder: "Contraseña",
            type: "Password",
          },
          {
            leyenda: "password2",
            placeholder: "Confirmar contraseña",
            type: "Password",
          },
        ]}
        btn_text={props.invertView ? "Editar" : "Registrar"}
        onClick={createOrEdit}
      />
      <Footer />
    </div>
  );
}

export default AddWorkerAdm;
