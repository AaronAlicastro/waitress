import React from "react";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";

function IngreToProduct(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />
        <Forms
            title="Agregar ingrediente"
            campos={[
                {
                    leyenda: "ingreName",
                    placeholder: "Nombre del ingrediente"
                },
                {
                    type: "Number",
                    leyenda: "ingreValue",
                    placeholder: "Valor del ingrediente"
                },
                {
                    type: "no-input",
                    data: <p className="info_text" key={new Date() + ""}>
                        El valor del producto es opcional, si lo quiere opmitir, solo coloque cero. 
                        <br /> <br />
                        La razón de este campo de valor, es por si este representa una parte de el valor
                        total del producto. En el que sea el caso, es necesario agregar el valor para 
                        que cuando este sea retirado, se refleje a su vez en el valor total.
                    </p>
                }
            ]}
            btn_text="Guardar"
        />
        <Footer />
    </div>;
}

export default IngreToProduct;