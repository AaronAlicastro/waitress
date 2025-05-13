import React from "react";
import "./styles/forms.css";
import { useAlert } from "react-alert";
import { getDataOfForm } from "../../../logic/formData";

function Forms(props) {
  const alert = useAlert();

  const generalFormClick = (e) => {
    e.preventDefault();
    const { filled, entrences, error } = getDataOfForm("#" + props.id);

    if (!filled) alert.show("Debes llenar todos los campos");
    else if (error) alert.show(error);
    else props.onClick(entrences);
  };

  const fieldsStructure = (cp, key) => {
    const textarea = (
      <textarea
        name={cp.leyenda}
        placeholder={cp.placeholder}
        defaultValue={cp.value}
      ></textarea>
    );

    const input = (
      <input
        name={cp.leyenda}
        type={cp.type || "text"}
        defaultChecked={cp.checked}
        placeholder={cp.placeholder}
        defaultValue={cp.value}
      />
    );

    return (
      <div className="input-wrapper" key={props.id + "-fields-" + key}>
        <label htmlFor={cp.leyenda}>{cp.placeholder}</label>
        <div className="input-group">
          {cp.type === "textarea" ? textarea : input}
        </div>
      </div>
    );
  };

  return (
    <form className="form" id={props.id}>
      <div className="form-inner">
        <h2>{props.title}</h2>

        {props.campos.map((cp, key) => {
          if (cp.type === "no-input") {
            return cp.data;
          }

          return fieldsStructure(cp, key);
        })}

        <div className="btn-group">
          <button
            onClick={generalFormClick}
            type="submit"
            className="general_btn"
          >
            {props.btn_text}
          </button>

          {props.btn_second}
        </div>
      </div>
    </form>
  );
}

export default Forms;
