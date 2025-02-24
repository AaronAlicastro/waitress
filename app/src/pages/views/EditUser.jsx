import React from "react";
import SideBoardFloat from "./components/SideBoardFloat";
import Forms from "./components/Forms";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";

function EditUser(props) {
  const editUser = (entrences) => {
    if (entrences.password1 === entrences.password2) {
      entrences.password = entrences.password1;
      entrences._id = props.userId;

      delete entrences.password1;
      delete entrences.password2;

      props.querys.editUser(entrences, (somthingWrong) => {
        if (somthingWrong) alert.show("No tienes permiso para editar");
        else {
          window.alert(
            "Editado con éxito. Ahora cerraremos sesión para actualizar datos"
          );
          window.history.go(0);
        }
      });
    } else alert.show("Las contraseñas no son iguales");
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => {}} // is not ok re-render the same
      />
      <FloatBack
        onClick={() => {
          props.goToView(props.lastView.view, props.lastView.dataView);
        }}
      />

      <Forms
        id="form_edit_user"
        title="Editar datos"
        campos={[
          {
            leyenda: "name",
            placeholder: "Nombre",
            value: props.querys.user.name,
          },
          {
            type: "email",
            leyenda: "email",
            placeholder: "Correo",
            value: props.querys.user.email,
          },
          {
            type: "password",
            leyenda: "password1",
            placeholder: "Contraseña",
          },
          {
            type: "password",
            leyenda: "password2",
            placeholder: "Confirmar contraseña",
          },
        ]}
        btn_text="Editar"
        onClick={editUser}
      />

      <Footer />
    </div>
  );
}

export default EditUser;
