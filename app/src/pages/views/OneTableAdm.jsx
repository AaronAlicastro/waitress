import React from "react";
import "./components/styles/showInfoGeneral.css";
import { IconContext } from "react-icons";
import {
    FaPen,
    FaTrash
} from "react-icons/fa";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import SideBoardFloat from "./components/SideBoardFloat";
import BotonAcc from "./components/BotonAcc";
import QrMaker from "./components/QrMaker";

function OneTableAdm(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />

        <QrMaker value={props.table._id} />
        <span className="infoGeneral_subtitle"> {props.table._id} </span>
        <h3 style={{ textAlign: "center" }}> {props.table.number} </h3>

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
    </div>;
}

export default OneTableAdm;