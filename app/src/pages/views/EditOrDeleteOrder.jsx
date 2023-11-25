import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaTimes,
    FaUndoAlt,
    FaCheck,
    FaTrash
} from "react-icons/fa";
import "./components/styles/showInfoGeneral.css";
import Footer from "./components/Footer";
import BotonAcc from "./components/BotonAcc";
import FloatBack from "./components/FloatBack";
import SideBoardFloat from "./components/SideBoardFloat";
import { useAlert } from "react-alert";

function EditOrDeleteOrder(props) {
    let alert = useAlert();
    let [view, setView] = useState("principal");
    let [currentProductsAsked, setCurrentProductsAsked] = useState([...props.orderChoosen.productsAsked]);
    let [total, setTotal] = useState(props.orderChoosen.total + 0);
    let key = 0;

    const changeData = () => {
        if (view == "principal") setView("change");
        else setView("principal");
    }
    const deplyList = {
        principal: () => (currentProductsAsked.length) ? <div>
            {
                currentProductsAsked.sort(() => -1).map((pr, i) => {
                    key++;
                    return <div className="flexRowAround checkList" key={key}>
                        <label>
                            ({pr.productCount}) {pr.product}
                            {
                                (pr.without.length) ? <div style={{ marginTop: "var(--general_space)" }}> Sin: [ {(pr.without + "")} ] </div> : ""
                            }
                        </label>
                        <span>{pr.totalProduct}</span>
                        <button className="general_btn" onClick={() => {
                            setTotal(total - pr.totalProduct);
                            currentProductsAsked.splice(i, 1);
                            setCurrentProductsAsked(currentProductsAsked);
                            changeData();
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaTimes />
                            </IconContext.Provider>
                        </button>
                    </div>
                })
            }
        </div> : "",
        change: () => deplyList.principal()
    }

    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
        <FloatBack onClick={() => props.goToView("tableListener", {})} />

        <h2 className="infoGeneral_details">Pedido n° {props.orderChoosen_number} </h2>
        <div className="flexRowAround">
            <BotonAcc onClick={() => {
                let pre = window.confirm("¿Desea eliminarlo?");
                if (pre) {
                    props.goToView(false, {}, (fun) => {
                        props.querys.orders.splice((props.orderChoosen_number - 1), 1);
                        let data = { _id: props.orderChoosen._id }
                        props.querys.deleteOrder(data, (somethingWrong) => {
                            if (somethingWrong) alert.show("Algo salio mal, revisa el internet");
                            else alert.show("Eliminado con éxito");
                            fun("tableListener", {});
                        });
                    });
                }
            }} >
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaTrash />
                </IconContext.Provider>
            </BotonAcc>
            {
                (currentProductsAsked.length && currentProductsAsked.length < props.orderChoosen.productsAsked.length) ?
                    <BotonAcc onClick={() => {
                        let pre = window.confirm("¿Desea editarlo?");
                        if (pre) {
                            props.goToView(false, {}, (fun) => {
                                props.querys.orders[(props.orderChoosen_number - 1)].productsAsked = currentProductsAsked;
                                props.querys.orders[(props.orderChoosen_number - 1)].total = total;
                                let data = {
                                    _id: props.orderChoosen._id,
                                    productsAsked: currentProductsAsked,
                                    total
                                }
                                props.querys.editOrder(data, (somethingWrong) => {
                                    if (somethingWrong) alert.show("Algo salio mal, revisa el internet");
                                    else alert.show("Editado con éxito");
                                    fun("tableListener", {});
                                });
                            });
                        }
                    }} >
                        <IconContext.Provider value={{ size: "0.7em" }}>
                            <FaCheck />
                        </IconContext.Provider>
                    </BotonAcc> : ""
            }
        </div>

        <div className="flexRowCenter">
            total: {total}
        </div>
        {deplyList[view]()}

        {
            (currentProductsAsked.length < props.orderChoosen.productsAsked.length) ? <div className="flexRowCenter">
                <BotonAcc onClick={() => {
                    setCurrentProductsAsked([...props.orderChoosen.productsAsked]);
                    setTotal(props.orderChoosen.total + 0);
                    changeData();
                }} >
                    <IconContext.Provider value={{ size: "0.7em" }}>
                        <FaUndoAlt />
                    </IconContext.Provider>
                </BotonAcc>
            </div> : ""
        }
        <Footer />
    </div>
}

export default EditOrDeleteOrder;