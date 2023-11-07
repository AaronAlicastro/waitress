import React from "react";
import { useAlert } from "react-alert";
import "./styles/forms.css";
import { getDataOfForm } from "../../../logic/formData";

function Forms(props) {
    let key = 0;
    let alert = useAlert();

    return <form className="form" id={props.id}>
        <div className="form-inner">
            <h2>{props.title}</h2>
            {
                props.campos.map(cp => {
                    key++;
                    if (cp.type == "no-input") {
                        return cp.data;
                    }
                    return <div className="input-wrapper" key={key}>
                        <label htmlFor={cp.leyenda}>{cp.placeholder}</label>
                        <div className="input-group">
                            {
                                (cp.type == "textarea") ?
                                    <textarea
                                        name={cp.leyenda}
                                        placeholder={cp.placeholder}
                                        defaultValue={cp.value}
                                    ></textarea>
                                    :
                                    <input
                                        name={cp.leyenda}
                                        type={cp.type || "text"}
                                        placeholder={cp.placeholder}
                                        defaultValue={cp.value}
                                    />
                            }
                        </div>
                    </div>
                })
            }
            <div className="btn-group">
                <button
                    onClick={e => {
                        e.preventDefault();
                        let { filled, entrences, error } = getDataOfForm("#" + props.id);
                        if (!filled) alert.show("Debes llenar todos los campos");
                        else if (error) alert.show(error);
                        else props.onClick(entrences);
                    }}
                    type="submit"
                    className="btn_form"
                >{props.btn_text}</button>

                {props.btn_second}
            </div>
        </div>
    </form>
}

export default Forms;