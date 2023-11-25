import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaCheck,
    FaTimes
} from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import "./components/styles/showInfoGeneral.css";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";

function AddProductToTable(props) {
    let [view, setView] = useState("principal");
    let [total, setTotal] = useState(props.total);
    let key = 0;
    let deplyList = {
        principal: () => (props.productsAsked.length) ? <div>
            <div className="flexRowCenter">
                total: {total}
            </div>
            {
                props.productsAsked.map((pr, i) => {
                    key++;
                    return <div className="flexRowAround checkList" key={key}>
                        <label>
                            ({pr.productCount}) {pr.product}
                        </label>
                        <span>{pr.totalProduct}</span>
                        <button className="general_btn" onClick={() => {
                            setTotal(total - pr.totalProduct);
                            props.productsAsked.splice(i, 1);
                            
                            if (view == "principal") setView("changeData");
                            else setView("principal");
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaTimes />
                            </IconContext.Provider>
                        </button>
                    </div>
                })
            }
        </div> : "",
        changeData: () => deplyList.principal()
    }

    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
        <FloatBack onClick={() => {
            let pre = window.confirm("¿Desea cancelar el pedido?");
            if (pre) props.goToView("tableListener", {});
        }} />
        <h2 className="infoGeneral_details">Añade Producto | finaliza</h2>
        <List
            list={props.querys.products.map(pr => pr.name)}
            onClick={(ls) => {
                props.goToView("editProctToOrder", {
                    productChoosen: props.querys.products.find(pr => pr.name == ls),
                    productsAsked: props.productsAsked,
                    total
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
        {deplyList[view]()}
        <Footer />
    </div>
}

export default AddProductToTable;