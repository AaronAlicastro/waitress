import React from "react";
import "./styles/bigBoton.css";

function BigBoton(props) {
    return <div className="bigBoton_container">
        <button
            className="bigBoton"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    </div>
}

export default BigBoton;