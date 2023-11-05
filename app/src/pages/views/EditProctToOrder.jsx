import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaUndoAlt,
    FaCheck,
    FaTimes
} from "react-icons/fa";
import "./components/styles/forms.css";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import Billcounter from "./components/Billcounter";
import BotonAcc from "./components/BotonAcc";

function EditProctToOrder(props) {
    let [view, setView] = useState("billCounter");
    let mientras = [...props.products.find(pr => pr.name == props.productChoosen).ingre];
    let [ingreWorked, setIngreWorked] = useState(mientras);
    let key = 0, productCount = 0;
    let confirmIngreChange = (change) => {
        if (view == "confirmIngre") setView("confirmIngreChange");
        else setView("confirmIngre");
        setIngreWorked(change);
    }
    let viewToShow = {
        billCounter: () => <Billcounter
            title={props.productChoosen}
            answer={(answer) => {
                if (answer) {
                    productCount = answer;
                    setView("confirmIngre");
                } else props.goToView(props.lastView.view, props.lastView.dataView);
            }}
        />,
        confirmIngre: () => {
            return <div>
                <h2 className="infoGeneral_details">Confirma los ingredientes</h2>
                {
                    ingreWorked.map((ingre, i) => {
                        key++;
                        return <div key={key} className="flexRowCenter">
                            <span style={{ marginRight: "var(--general_space)" }}>{ingre.name}</span>
                            <button className="btn_form" onClick={() => {
                                ingreWorked.splice(i, 1);
                                confirmIngreChange(ingreWorked);
                            }}>
                                <IconContext.Provider value={{ size: "0.7em" }}>
                                    <FaTimes />
                                </IconContext.Provider>
                            </button>
                        </div>
                    })
                }
                <div className="flexRowAround">
                    <BotonAcc onClick={() => {
                        mientras = [...props.products.find(pr => pr.name == props.productChoosen).ingre];
                        confirmIngreChange(mientras);
                    }}>
                        <IconContext.Provider value={{ size: "0.7em" }}>
                            <FaUndoAlt />
                        </IconContext.Provider>
                    </BotonAcc>

                    <BotonAcc onClick={() => {
                        props.goToView("tableListener", {});
                    }}>
                        <IconContext.Provider value={{ size: "0.7em" }}>
                            <FaCheck />
                        </IconContext.Provider>
                    </BotonAcc>
                </div>
            </div>
        },
        confirmIngreChange: () => viewToShow.confirmIngre()
    }

    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)} />
        {viewToShow[view]()}
        <Footer />
    </div>
}

export default EditProctToOrder;