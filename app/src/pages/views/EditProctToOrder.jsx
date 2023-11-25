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
import { areEquals } from "../../logic/generalFunctions";

function EditProctToOrder(props) {
    let [view, setView] = useState("billCounter");
    // mientras is to avoid editing the principal product
    let mientras = [...props.productChoosen.ingre];
    let [ingreWorked, setIngreWorked] = useState(mientras);

    // this is the new order that the waiter is working on
    let [currentProductsAsked, setCurrentProductsAsked] = useState([]);
    let [without, setWithout] = useState([]); // to become individual the new order

    // to calculate the total new order
    let [totalProduct, setTotalProduct] = useState(0); // current product's price in base of customer's order
    let [productCount, setProductCount] = useState(0); // the current count of the current customer's order
    let [currentProductCount, setCurrentProductCount] = useState(1); // to follow each order as individual order
    let [currentTotal, setCurrentTotal] = useState(0); // to add the last total to the current total.
    let key = 0;

    const addNewProductAsked = () => {
        currentProductsAsked.push({
            product: props.productChoosen.name,
            productCount: 1,
            totalProduct,
            without
        });
        setCurrentProductsAsked(currentProductsAsked);
    }
    const addProductAskedOlder = () => {
        let allWithout = currentProductsAsked.map(pr => pr.without), withoutEdited = false;
        allWithout.find((wh, i) => {
            if (areEquals(wh, without)) {
                withoutEdited = true;
                currentProductsAsked[i].productCount += 1;
                currentProductsAsked[i].totalProduct += totalProduct;
                return true;
            }
            return false;
        });
        if (!withoutEdited) addNewProductAsked();
        else setCurrentProductsAsked(currentProductsAsked);
    };

    const confirmIngreChange = (change) => {
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
                    setTotalProduct(props.productChoosen.price);
                    setCurrentTotal(props.productChoosen.price);
                    setView("confirmIngre");
                } else props.goToView(props.lastView.view, props.lastView.dataView);
            }}
        />,
        confirmIngre: () => {
            return <div>
                <h2 className="infoGeneral_details">Has elegido ({productCount}) productos</h2>
                <h3 className="infoGeneral_details">Confirma los ingredientes del n° ({currentProductCount}) </h3>
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
                        setTotalProduct(props.productChoosen.price);
                        setWithout([]);
                        confirmIngreChange(mientras);
                    }}>
                        <IconContext.Provider value={{ size: "0.7em" }}>
                            <FaUndoAlt />
                        </IconContext.Provider>
                    </BotonAcc>

                    <BotonAcc onClick={() => {
                        if (currentProductCount < productCount) {
                            let mientras = [...props.productChoosen.ingre];
                            if (currentProductsAsked.length) addProductAskedOlder();
                            else addNewProductAsked();

                            setCurrentProductCount(currentProductCount + 1);
                            setWithout([]);
                            confirmIngreChange(mientras);
                        } else {
                            addProductAskedOlder();
                            props.goToView("addProductToTable", {
                                productsAsked: [...props.productsAsked, ...currentProductsAsked],
                                total: (props.total + currentTotal)
                            });
                        }
                        setTotalProduct(props.productChoosen.price);
                        setCurrentTotal(currentTotal + totalProduct);
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