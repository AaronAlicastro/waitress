import React from "react";
import "./styles/leftFloatButtonAcc.css";
import { IconContext } from "react-icons";
import { FaChevronRight } from "react-icons/fa";

function LeftFloatButtonAcc({ onClick }) {
  return (
    <button className="leftFloatButtonAcc_general" onClick={onClick}>
      <IconContext.Provider value={{ size: "0.7em" }}>
        <FaChevronRight />
      </IconContext.Provider>
    </button>
  );
}

export default LeftFloatButtonAcc;
