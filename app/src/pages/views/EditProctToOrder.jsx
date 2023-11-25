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
import { useAlert } from "react-alert";

function EditProctToOrder(props) {
    let alert = useAlert();
    let [view, setView] = useState("billCounter");
    // mientras is to avoid editing the principal product
    let mientras = [...props.productChoosen.ingre];
    let [ingreWorked, setIngreWorked] = useState(mientras);
    let [without, setWithout] = useState([]);
    let [totalProduct, setTotalProduct] = useState(0);
    let [productCount, setProductCount] = useState(0);
    let key = 0;

    let confirmIngreChange = (change) => {
        if (view == "confirmIngre") setView("confirmIngreChange");
        else setView("confirmIngre");
        setIngreWorked(change);
    }
    let viewToShow = {
        billCounter: () => <Billcounter
            title={props.productChoosen.name}
            answer={(answer) => {
                if (answer) {
                    setProductCount(answer);
                    setTotalProduct((props.productChoosen.price * answer));
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
                                let ingreQuitado = ingreWorked.splice(i, 1)[0];
                                without.push(ingreQuitado.name);

                                setTotalProduct((totalProduct - ingreQuitado.value));
                                setWithout(without);
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
                        let mientras = [...props.productChoosen.ingre];
                        setTotalProduct((props.productChoosen.price * productCount));
                        setWithout([]);
                        confirmIngreChange(mientras);
                    }}>
                        <IconContext.Provider value={{ size: "0.7em" }}>
                            <FaUndoAlt />
                        </IconContext.Provider>
                    </BotonAcc>

                    <BotonAcc onClick={() => {
                        props.productsAsked.push({
                            product: props.productChoosen.name,
                            productCount,
                            totalProduct,
                            without
                        });
                        props.goToView("addProductToTable", {
                            productsAsked: props.productsAsked,
                            total: (props.total + totalProduct)
                        });
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
        <SideBoardFloat
            userName={props.userName}
            userId={props.userId}
        />
        <FloatBack onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)} />
        {viewToShow[view]()}
        <Footer />
    </div>
}

export default EditProctToOrder;