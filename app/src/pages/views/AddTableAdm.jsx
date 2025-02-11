import React from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import { useAlert } from "react-alert";

function AddTableAdm(props) {
    let alert = useAlert();
    let chooseView = (invert) => {
        return <div className="pageDivApp">
            <SideBoardFloat
                userName={props.querys.user.name}
                userId={props.querys.user._id}
                editUser={() => props.goToView("editUser", {})}
            />
            <FloatBack
                onClick={() => props.goToView(props.lastView.view, props.lastView.dataView)}
            />
            <Forms
                id="form_EditTableAdm_form_createTableAdm"
                title={(invert) ? "Editar mesa" : "Registrar Mesa"}
                campos={[
                    {
                        leyenda: "number",
                        placeholder: "Número de mesa",
                        type: "Number"
                    }
                ]}
                btn_text={(invert) ? "Editar" : "Registrar"}
                onClick={(entrences) => {
                    props.goToView(false, {}, (fun) => {
                        if (invert) {
                            entrences._id = props.table._id;
                            props.querys.editTable(entrences, (somethingWrong) => {
                                if (somethingWrong) {
                                    alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                    fun();
                                } else fun("principalViewAdm", 2);
                            });
                        } else {
                            props.querys.createTable(entrences, (somethingWrong) => {
                                if (somethingWrong) {
                                    alert.show("Algo ha salido mal, comprueba la conexión a internet");
                                    fun();
                                } else fun("principalViewAdm", 2);
                            });
                        }
                    });
                }}
            />
            <Footer />
        </div>;
    }

    if (props.invertView) return chooseView(true);
    return chooseView();
}

export default AddTableAdm;