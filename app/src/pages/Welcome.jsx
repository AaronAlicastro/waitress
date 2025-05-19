import React from "react";
import Footer from "./views/components/Footer";
import Forms from "./views/components/Forms";
import { useAlert } from "react-alert";

function Welcome(props) {
  const alert = useAlert();

  const selectViewToGo = () => {
    if (props.querys.user.hierarchy === "waitress") {
      return "principalViewWorker";
    } else if (props.querys.user.hierarchy === "supervisor") {
      return "principalViewSupervisor";
    }

    return "principalViewAdm";
  };

  const changeView = (changeTo) => {
    const viewToGo = selectViewToGo();

    if (viewToGo === "principalViewSupervisor") {
      props.querys.workersListening.requestDataBase = (fun) => {
        props.querys.getPendingOrdersBySupervisor(fun);
      };

      props.querys.getAllTablesBySupervisor(() => {
        props.querys.workersListening.startListening();
        changeTo(viewToGo);
      });
    } else if (viewToGo === "principalViewWorker") {
      props.querys.workersListening.requestDataBase = (fun) => {
        props.querys.getFinishedOrdersByWaitress(fun);
      };

      props.querys.workersListening.startListening();
      changeTo(viewToGo);
    } else changeTo(viewToGo);
  };

  const logIn = (entrences) => {
    props.goToView(false, null, (fun) => {
      props.querys.verifiUser(entrences, (not_found) => {
        if (not_found) {
          alert.show("Usuario no encontrado");
          fun();
        } else changeView(fun);
      });
    });
  };

  return (
    <div className="pageDivApp">
      <h2 className="infoGeneral_tilte">Waitress</h2>
      <Forms
        id="form_welcome"
        title="Inicia sesión"
        campos={[
          {
            type: "email",
            leyenda: "email",
            placeholder: "Correo",
          },
          {
            type: "password",
            leyenda: "password",
            placeholder: "Contraseña",
          },
        ]}
        btn_text="Iniciar"
        onClick={logIn}
      />

      <Footer />
    </div>
  );
}

export default Welcome;
