import React from "react";
import "./styles/floatBack.css";
import { IconContext } from "react-icons";
import { FaReply } from "react-icons/fa";

function FloatBack({ onClick }) {
  return (
    <div className="floatBack" onClick={onClick}>
      <IconContext.Provider value={{ size: "0.7em" }}>
        <FaReply />
      </IconContext.Provider>
    </div>
  );
}

export default FloatBack;
