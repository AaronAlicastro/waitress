import React from "react";
import { IconContext } from "react-icons";
import {
    FaPlus
} from "react-icons/fa";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import BotonAcc from "./components/BotonAcc";

function AddProductAdm(props) {
    let ingres = props.ingres || [
        {
            name: "pera",
            valor: 3
        },
        {
            name: "mango",
            valor: 5
        }
    ];

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
                ...ingres.map((ig, i) => ({
                    type: "no-input",
                    data: <div className="flexRowCenter" key={new Date() + "" + i}>
                        <input type="text" value={ig.name} disabled />
                        <button className="btn_form">X</button>
                    </div>,
                })),
                {
                    type: "no-input",
                    data: <div className="flexRowCenter" key={new Date() + ""}>
                        <BotonAcc onClick={e => {
                            e.preventDefault();
                            props.goToView("ingreToProduct", ingres);
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                }
            ]}
            btn_text="Registrar"
        />
        <Footer />
    </div>;
}

export default AddProductAdm;