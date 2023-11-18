import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import { useAlert } from "react-alert";

function AddWorkerAdm(props) {
    let alert = useAlert();
    let chooseView = (invert) => {
        let workerWorked = props.worker || {};
        
        return <div className="pageDivApp">
            <SideBoardFloat />
            <FloatBack
                onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
            />
            <Forms
                id="form_createWorkerAdm_or_edit"
                title={(invert) ? "Editar trabajador" : "Registrar trabajador"}
                campos={[
                    {
                        leyenda: "name",
                        placeholder: "Nombre",
                        value: workerWorked.name
                    },
                    {
                        leyenda: "phone",
                        placeholder: "Teléfono",
                        type: "Number",
                        value: workerWorked.phone
                    },
                    {
                        leyenda: "email",
                        placeholder: "Correo",
                        value: workerWorked.email
                    },
                    {
                        leyenda: "password1",
                        placeholder: "Contraseña",
                        type: "Password"
                    },
                    {
                        leyenda: "password2",
                        placeholder: "Confirmar contraseña",
                        type: "Password"
                    }
                ]}
                btn_text={(invert) ? "Editar" : "Registrar"}
                onClick={(entrences) => {
                    if (entrences.password1 == entrences.password2) {
                        entrences.password = entrences.password1;
                        delete entrences.password1;
                        delete entrences.password2;
                        if (invert) {
                            entrences._id = workerWorked._id;
                            props.goToView(false, {}, (fun) => {
                                props.querys.editWorker(entrences, (somethingWrong) => {
                                    if (somethingWrong) {
                                        alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                        fun();
                                    } else fun("principalViewAdm", 1);
                                });
                            });
                        } else {
                            props.goToView(false, {}, (fun) => {
                                props.querys.createWorker(entrences, (somethingWrong) => {
                                    if (somethingWrong) {
                                        alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                        fun();
                                    } else fun("principalViewAdm", 1);
                                });
                            });
                        }
                    } else alert.show("Las contraseñas no coinciden");
                }}
            />
            <Footer />
        </div>;
    }

    if (props.invertView) return chooseView(true);
    return chooseView();
}

export default AddWorkerAdm;