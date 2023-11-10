import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import { useAlert } from "react-alert";

function AddTableAdm(props) {
    let alert = useAlert();

    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />
        <Forms
            id="form_createTableAdm"
            title="Registrar mesa"
            campos={[
                {
                    leyenda: "number",
                    placeholder: "Número de mesa",
                    type: "Number"
                }
            ]}
            btn_text="Registrar"
            onClick={(entrences) => {
                props.goToView(false, {}, (fun) => {
                    props.querys.createTable(entrences, (somethingWrong) => {
                        if (somethingWrong) {
                            alert.show("Algo ha salido mal, comprueba la conexión a internet");
                            fun();
                        } else fun("principalViewAdm", 2);
                    });
                });
            }}
        />
        <Footer />
    </div>;
}

export default AddTableAdm;