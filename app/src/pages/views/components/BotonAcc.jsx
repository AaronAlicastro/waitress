import React from "react";
import "./styles/botonAcc.css";

function BotonAcc(props) {
  return (
    <button className="botonAcc" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default BotonAcc;
