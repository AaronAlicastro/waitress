import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaPlus
} from "react-icons/fa";
import { useAlert } from "react-alert";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import BotonAcc from "./components/BotonAcc";

function AddProductAdm(props) {
    let [formView, setViewForm] = useState("front");
    let [ingres, setIngres] = useState((props.ingres || []));
    let alert = useAlert();
    let productWorked = props.product || {};

    let changeData = () => {
        if (formView == "front") setViewForm("change");
        else setViewForm("front");
    }
    let renderForm = {
        front: () => {
            return <Forms
                id="form_editProductAdm_form_createProductAdm"
                title={(props.invertView) ? "Editar producto" : "Crear producto"}
                campos={[
                    {
                        leyenda: "name",
                        placeholder: "Nombre",
                        value: productWorked.name
                    },
                    {
                        leyenda: "price",
                        placeholder: "Valor",
                        type: "Number",
                        value: productWorked.price
                    },
                    ...ingres.map((ig, i) => ({
                        type: "no-input",
                        data: <div className="flexRowCenter" key={new Date() + "" + i}>
                            <input type="text" value={ig.name} disabled />
                            <button className="btn_form" onClick={e => {
                                e.preventDefault();
                                ingres.splice(i, 1);
                                setIngres(ingres);
                                changeData();
                            }}>X</button>
                        </div>,
                    })),
                    {
                        type: "no-input",
                        data: <div className="flexRowCenter" key={new Date() + ""}>
                            <BotonAcc onClick={e => {
                                e.preventDefault();
                                props.goToView("ingreToProduct", {
                                    ingres,
                                    product: props.product,
                                    invertView: props.invertView
                                });
                            }}>
                                <IconContext.Provider value={{ size: "0.7em" }}>
                                    <FaPlus />
                                </IconContext.Provider>
                            </BotonAcc>
                        </div>
                    }
                ]}
                btn_text={(props.invertView) ? "Editar" : "Registrar"}
                onClick={(entrences) => {
                    entrences.ingre = ingres;
                    props.goToView(false, null, (fun) => {
                        if (props.invertView) {
                            entrences._id = productWorked._id;
                            props.querys.editProduct(entrences, (somethingWrog) => {
                                if (somethingWrog) {
                                    alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                    fun(false, props);
                                } else fun("principalViewAdm", 0);
                            });
                        } else {
                            props.querys.createProduct(entrences, (somethingWrog) => {
                                if (somethingWrog) {
                                    alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                    fun(false, ingres);
                                } else fun("principalViewAdm", 0);
                            });
                        }
                    });
                }}
            />;
        },
        change: () => renderForm.front()
    }

    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
            editUser={() => props.goToView("editUser")}
        />
        <FloatBack
            onClick={() => props.goToView("principalViewAdm", 0)}
        />
        {renderForm[formView]()}
        <Footer />
    </div>;
}

export default AddProductAdm;