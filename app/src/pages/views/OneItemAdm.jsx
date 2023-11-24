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
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
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
            <BotonAcc onClick={() => props.goToView("addProductAdm", {
                invertView: true,
                ingres: props.product.ingre,
                product: props.product
            })}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaPen />
                </IconContext.Provider>
            </BotonAcc>

            <BotonAcc onClick={() => {
                let pre = window.confirm("¿Desea eliminar este producto?");
                if (pre) {
                    props.goToView(false, {}, (fun) => {
                        props.querys.deleteProduct({ _id: props.product._id }, (somethingWrog) => {
                            if (somethingWrog) {
                                alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                fun(false, props.product);
                            } else fun("principalViewAdm", 0);
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
    </div>
}

export default OneItemAdm;