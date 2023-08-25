import React from "react";
import "./styles/forms.css";

function Forms(props) {
    let key = 0;

    return <form className="form">
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
                <button type="submit" className="btn_form">{props.btn_text}</button>
                {props.btn_second}
            </div>
        </div>
    </form>
}

export default Forms;