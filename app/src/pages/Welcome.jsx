import React from "react";
import Footer from "./views/components/Footer";
import Forms from "./views/components/Forms";
import { useAlert } from "react-alert";
import "./views/components/styles/showInfoGeneral.css";

function Welcome(props) {
    let alert = useAlert();
    
    return <div className="pageDivApp">
        <h2 className="infoGeneral_tilte">Waitress</h2>
        <Forms
            id="form_welcome"
            title="Inicia sesión"
            campos={[
                {
                    type: "email",
                    leyenda: "email",
                    placeholder: "correo"
                },
                {
                    type: "password",
                    leyenda: "password",
                    placeholder: "Contraseña"
                }
            ]}
            btn_text="Iniciar"
            onClick={(entrences) => {
                props.goToView(false, {}, (fun) => {
                    props.querys.verifiUser(entrences, (not_found, IsManager) => {
                        if (not_found) {
                            alert.show("Usuario no encontrado");
                            fun();
                        } else {
                            if (IsManager) fun("principalViewAdm");
                            else fun("principalViewWorker");
                        }
                    });
                });
            }}
        />
        <Footer />
    </div>
}

export default Welcome;