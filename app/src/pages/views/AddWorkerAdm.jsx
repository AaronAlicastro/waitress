import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";

function AddWorkerAdm(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />
        <Forms
            title="Registrar trabajador"
            campos={[
                {
                    leyenda: "name",
                    placeholder: "Nombre",
                },
                {
                    leyenda: "phone",
                    placeholder: "Teléfono",
                    type: "Number"
                },
                {
                    leyenda: "email",
                    placeholder: "Correo"
                },
                {
                    leyenda: "password1",
                    placeholder: "Contraseña",
                    type: "Password"
                },
                {
                    leyenda: "password2",
                    placeholder: "Confirmar contraseña",
                    type: "Password"
                }
            ]}
            btn_text="Registrar"
        />
        <Footer />
    </div>;
}

export default AddWorkerAdm;