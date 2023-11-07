import React from "react";
import Footer from "./views/components/Footer";
import Forms from "./views/components/Forms";
import "./views/components/styles/showInfoGeneral.css";
import Querys from "../logic/querys";

function Welcome() {
    let querys = new Querys();

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
                querys.verifiUser(entrences, (r) => {
                    console.log(r)
                });
            }}
        />
        <Footer />
    </div>
}

export default Welcome;