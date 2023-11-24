import React from "react";
import { IconContext } from "react-icons";
import {
    FaPlus
} from "react-icons/fa";
import "./views/components/styles/showInfoGeneral.css";
import { useAlert } from "react-alert";
import SideBoardFloat from "./views/components/SideBoardFloat";
import NavBurguer from "./views/components/NavBurguer";
import Footer from "./views/components/Footer";
import BotonAcc from "./views/components/BotonAcc";
import List from "./views/components/List";

function PrincipalViewAdm(props) {
    let alert = useAlert();
    let list_db_response = (fun, somethingWrong, message, field) => {
        if (message) {
            alert.show(message);
            fun(false, field);
        } else if (somethingWrong) alert.show("Algo ha salido mal, revise su internet");
        else fun(false, field);
    }

    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
        <NavBurguer
            Pseleccion={props.seleccion}
            opciones={[
                "Productos",
                "Trabajadores",
                "Mesas"
            ]}
            content={[
                <div>
                    {
                        (props.querys.products.length) ? <List
                            list={props.querys.products.map(pr => pr.name)}
                            onClick={data => {
                                let product = props.querys.products.find(pr => pr.name == data);
                                props.goToView("oneItemAdm", product);
                            }}
                            constData={(
                                <div className="infoGeneral_details flexRowCenter">
                                    <button
                                        className="general_btn"
                                        onClick={() => {
                                            props.goToView(false, {}, (fun) => {
                                                props.querys.getProducts((somethingWrong, message) => list_db_response(fun, somethingWrong, message, 0));
                                            })
                                        }}
                                    >Cargar</button>
                                </div>
                            )}
                        /> : <div className="infoGeneral_details flexRowCenter">
                            <span>No hay productos cargados</span>
                            <button
                                className="general_btn"
                                onClick={() => {
                                    props.goToView(false, {}, (fun) => {
                                        props.querys.getProducts((somethingWrong, message) => list_db_response(fun, somethingWrong, message, 0));
                                    });
                                }}
                            >Cargar</button>
                        </div>
                    }
                    <div className="flexRowCenter">
                        <BotonAcc onClick={() => props.goToView("addProductAdm", {})}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                </div>,
                <div>
                    {
                        (props.querys.workers.length) ? <List
                            list={props.querys.workers.map(wr => wr.name)}
                            onClick={data => {
                                let worker = props.querys.workers.find(wr => wr.name == data);
                                props.goToView("oneWorkerAdm", worker);
                            }}
                            constData={(
                                <div className="infoGeneral_details flexRowCenter">
                                    <button
                                        className="general_btn"
                                        onClick={() => {
                                            props.goToView(false, {}, (fun) => {
                                                props.querys.getWorkers((somethingWrong, message) => list_db_response(fun, somethingWrong, message, 1));
                                            })
                                        }}
                                    >Cargar</button>
                                </div>
                            )}
                        /> : <div className="infoGeneral_details flexRowCenter">
                            <span>No hay trabajadores cargados</span>
                            <button
                                className="general_btn"
                                onClick={() => {
                                    props.goToView(false, {}, (fun) => {
                                        props.querys.getWorkers((somethingWrong, message) => list_db_response(fun, somethingWrong, message, 1));
                                    });
                                }}
                            >Cargar</button>
                        </div>
                    }
                    <div className="flexRowCenter">
                        <BotonAcc onClick={() => {
                            props.goToView("addWorkerAdm", {});
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                </div>,
                <div>
                    {
                        (props.querys.tables.length) ? <List
                            list={props.querys.tables.map(tb => tb.number)}
                            onClick={data => {
                                let table = props.querys.tables.find(tb => tb.number == data);
                                props.goToView("oneTableAdm", table);
                            }}
                            constData={(
                                <div className="infoGeneral_details flexRowCenter">
                                    <button
                                        className="general_btn"
                                        onClick={() => {
                                            props.goToView(false, {}, (fun) => {
                                                props.querys.getTables((somethingWrong, message) => list_db_response(fun, somethingWrong, message, 2));
                                            });
                                        }}
                                    >Cargar</button>
                                </div>
                            )}
                        /> : <div className="infoGeneral_details flexRowCenter">
                            <span>No hay mesas cargadas</span>
                            <button
                                className="general_btn"
                                onClick={() => {
                                    props.goToView(false, {}, (fun) => {
                                        props.querys.getTables((somethingWrong, message) => list_db_response(fun, somethingWrong, message, 2));
                                    });
                                }}
                            >Cargar</button>
                        </div>
                    }
                    <div className="flexRowCenter">
                        <BotonAcc onClick={() => {
                            props.goToView("addTableAdm", {});
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                </div>
            ]}
        />
        <Footer />
    </div>
}

export default PrincipalViewAdm;