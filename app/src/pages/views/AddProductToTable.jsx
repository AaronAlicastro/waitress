import React from "react";
import { IconContext } from "react-icons";
import {
    FaCheck
} from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import "./components/styles/showInfoGeneral.css";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";

function AddProductToTable(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack onClick={() => {
            let pre = window.confirm("¿Desea cancelar el pedido?");
            if (pre) props.goToView("tableListener", {});
        }} />
        <h2 className="infoGeneral_details">Añade Producto | finaliza</h2>
        <List
            list={props.products.map(pr => pr.name)}
            onClick={(ls) => {
                props.goToView("editProctToOrder", {
                    tableChoosen: props.tableChoosen,
                    products: props.products,
                    productChoosen: ls
                });
            }}
        />
        <div className="flexRowCenter">
            <BotonAcc onClick={() => {
                props.goToView("tableListener", {});
            }} >
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaCheck />
                </IconContext.Provider>
            </BotonAcc>
        </div>
        <Footer />
    </div>
}

export default AddProductToTable;