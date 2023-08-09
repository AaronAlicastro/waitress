import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";

function AddProductAdm(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />
        <Forms
            title="Registrar producto"
            campos={[
                {
                    leyenda: "name",
                    placeholder: "Nombre",
                },
                {
                    leyenda: "value",
                    placeholder: "Valor",
                    type: "Number"
                },
                {
                    leyenda: "ingreNames",
                    placeholder: "Ingredientes (separa con ',')",
                    type: "textarea"
                },
                {
                    leyenda: "ingreValues",
                    placeholder: "Valores de ingredientes (separa con ',')",
                    type: "textarea"
                }
            ]}
            btn_text="Registrar"
        />
        <Footer />
    </div>;
}

export default AddProductAdm;