import React from "react";
import "./components/styles/showInfoGeneral.css";
import { IconContext } from "react-icons";
import {
    FaPen,
    FaTrash
} from "react-icons/fa";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import QrMaker from "./components/QrMaker";
import SideBoardFloat from "./components/SideBoardFloat";
import BotonAcc from "./components/BotonAcc";

function OneItemAdm(props) {
    let key = 1;

    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />

        <QrMaker value={props.product._id} />
        <span className="infoGeneral_subtitle"> {props.product._id} </span>

        <h3 className="infoGeneral_tilte"> {props.product.name} </h3>
        <h5 className="infoGeneral_tilte"> {props.product.price} $ </h5>

        <ul className="infoGeneral_details">
            Ingredientes:
            {
                props.product.ingre.map(ingre => {
                    key++;
                    return <li key={key}> {ingre.name} </li>
                })
            }
        </ul>

        <div className="infoGeneral_actionsToDo">
            <BotonAcc onClick={() => console.log(3)}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaPen />
                </IconContext.Provider>
            </BotonAcc>

            <BotonAcc onClick={() => console.log(3)}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaTrash />
                </IconContext.Provider>
            </BotonAcc>
        </div>

        <Footer />
    </div>
}

export default OneItemAdm;