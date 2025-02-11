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
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
            editUser={() => props.goToView("editUser", {})}
        />
        <FloatBack
            onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
        />

        <QrMaker value={props.table._id} />
        <span className="infoGeneral_subtitle"> {props.table._id} </span>
        <h3 style={{ textAlign: "center" }}> {props.table.number} </h3>

        <div className="infoGeneral_actionsToDo">
            <BotonAcc onClick={() => props.goToView("addTableAdm", {
                invertView: true,
                table: props.table
            })}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaPen />
                </IconContext.Provider>
            </BotonAcc>

            <BotonAcc onClick={() => {
                let pre = window.confirm("¿Desea eliminar esta mesa?");
                if (pre) {
                    props.goToView(false, {}, (fun) => {
                        props.querys.deleteTable({ _id: props.table._id }, (somethingWrong) => {
                            if (somethingWrong) {
                                alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                fun(false, props.table);
                            } else fun("principalViewAdm", 2);
                        });
                    });
                }
            }}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaTrash />
                </IconContext.Provider>
            </BotonAcc>
        </div>

        <Footer />
    </div>;
}

export default OneTableAdm;