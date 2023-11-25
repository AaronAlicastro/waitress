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
import { useAlert } from "react-alert";

function AddProductToTable(props) {
    let alert = useAlert();
    let [view, setView] = useState("principal");
    let [total, setTotal] = useState(props.total);
    let key = 0;
    let deplyList = {
        principal: () => (props.productsAsked.length) ? <div>
            <div className="flexRowCenter">
                total: {total}
            </div>
            {
                props.productsAsked.sort(() => -1).map((pr, i) => {
                    key++;
                    return <div className="flexRowAround checkList" key={key}>
                        <label>
                            ({pr.productCount}) {pr.product}
                            {
                                (pr.without.length) ? <div style={{marginTop:"var(--general_space)"}}> Sin: [ {(pr.without + "")} ] </div> : ""
                            }
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
                if (props.productsAsked.length) {
                    let pre = window.confirm("¿Confirma el pedido?");
                    if (pre) {
                        props.goToView(false, {}, (fun) => {
                            let data = {
                                manager: props.querys.user.manager,
                                table: props.querys.tableChoosen._id,
                                tableNumber: props.querys.tableChoosen.number,
                                productsAsked: props.productsAsked,
                                total
                            }
                            props.querys.createOrder(data, (somethingWrong) => {
                                if (somethingWrong) alert.show("Algo ha salido mal, comprueba el internet");
                                else alert.show("Arriba pedido ¡!");
                                fun("tableListener", {});
                            });
                        });
                    }
                } else alert.show("Uhm, selecciona un producto primero a la orden");
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