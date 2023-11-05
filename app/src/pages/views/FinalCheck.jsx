import React from "react";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import Forms from "./components/Forms";

function FinalCheck(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack onClick={() => props.goToView("principalViewWorker", {})} />
        <Forms
            title="Cuenta de la mesa 3"
            campos={[{
                leyenda: "total",
                type: "disabled",
                value: props.total
            }]}
            btn_text="Finalizar"
        />
        <Footer />
    </div>
}

export default FinalCheck;