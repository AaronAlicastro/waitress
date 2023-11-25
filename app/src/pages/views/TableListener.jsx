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
    let total = 0;
    props.querys.orders.forEach(or => {
        total += or.total;
    });

    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
        <FloatBack onClick={() => props.goToView("principalViewWorker")} />

        <h2 className="infoGeneral_tilte">MS {props.querys.tableChoosen.number}</h2>
        <div className="flexRowAround">
            {
                (total) ? <BotonAcc onClick={() => props.goToView("finalCheck")}>
                    <IconContext.Provider value={{ size: "0.7em" }}>
                        <FaCheck />
                    </IconContext.Provider>
                </BotonAcc> : ""
            }

            <BotonAcc onClick={() => props.goToView("addProductToTable", {
                tableChoosen: props.querys.tableChoosen,
                products: props.querys.products
            })}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaPlus />
                </IconContext.Provider>
            </BotonAcc>
        </div>
        <div className="flexRowCenter">
            Total: {total}
        </div>

        <List
            list={props.querys.orders.map((or, i) => ("Pedido " + (i + 1)))}
            onClick={(ls) => {
                let index = (parseInt(ls.replace("Pedido ", "")) - 1);
                props.goToView("editOrDeleteOrder", {
                    orderChoosen: props.querys.orders[index],
                    orderChoosen_number: (index + 1)
                });
            }}
        />
        <Footer />
    </div>
}

export default TableListener;