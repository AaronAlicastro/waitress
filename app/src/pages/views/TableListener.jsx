import React from "react";
import { IconContext } from "react-icons";
import {
    FaCheck,
    FaPlus
} from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import "./components/styles/showInfoGeneral.css";
import "./components/styles/forms.css";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";

function TableListener(props) {
    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />

        <FloatBack onClick={() => props.goToView("principalViewWorker")} />
        <h2 className="infoGeneral_tilte">MS {props.querys.tableChoosen.number}</h2>
        <List
            list={ props.querys.orders.map(or => "Pedido " + or.number) }
            onClick={(ls) => {
                console.log(ls)
            }}
        />
        <div className="infoGeneral_actionsToDo">
            <BotonAcc onClick={() => {
                let pre = window.confirm("¿Desea finalizar y sacar cuentas del pedido?");
                if (pre) props.goToView("finalCheck", {
                    total: 1000,
                    tableChoosen: props.querys.tableChoosen
                });
            }}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaCheck />
                </IconContext.Provider>
            </BotonAcc>

            <BotonAcc onClick={() => props.goToView("addProductToTable", {
                tableChoosen: props.querys.tableChoosen,
                products: props.querys.products
            })}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaPlus />
                </IconContext.Provider>
            </BotonAcc>
        </div>
        <Footer />
    </div>
}

export default TableListener;