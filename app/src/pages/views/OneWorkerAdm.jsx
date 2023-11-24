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

function OneWorkerAdm(props) {
    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
        <FloatBack
            onClick={() => props.goToView("principalViewAdm", 1)}
        />

        <h3 className="infoGeneral_tilte"> {props.worker.name} </h3>
        <ul className="infoGeneral_details">
            <li> Correo: {props.worker.email} </li>
            <li> Teléfono: {props.worker.phone} </li>
        </ul>

        <div className="infoGeneral_actionsToDo">
            <BotonAcc onClick={() => props.goToView("addWorkerAdm", {
                invertView: true,
                worker: props.worker
            })}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaPen />
                </IconContext.Provider>
            </BotonAcc>

            <BotonAcc onClick={() => {
                let pre = window.confirm("¿Desea eliminar este trabajador?");
                if (pre) {
                    props.goToView(false, {}, (fun) => {
                        props.querys.deleteWorker({ _id: props.worker._id }, (somethingWrong) => {
                            if (somethingWrong) {
                                alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                fun(false, props.worker);
                            } else fun("principalViewAdm", 1);
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

export default OneWorkerAdm;