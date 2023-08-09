import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";

function AddTableAdm(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />
        <Forms
            title="Registrar mesa"
            campos={[
                {
                    leyenda: "number",
                    placeholder: "Número de mesa",
                    type: "Number"
                }
            ]}
            btn_text="Registrar"
        />
        <Footer />
    </div>;
}

export default AddTableAdm;