import React, { useState } from "react";
import "./styles/navBurguer.css";
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";

function NavBurguer({ opciones, content, Pseleccion }) {
  const [seleccion, setSeleccion] = useState(Pseleccion || 0);

  const openNavBurber = () => {
    const navbur = document.querySelector(".navBurguerSide");
    navbur.style.animation = "openNavBurguerSide .4s forwards";
  };

  const selectOne = (index) => {
    document.querySelector(".navBurguerSide").style.animation =
      "closeNavBurguerSide .4s forwards";

    setSeleccion(index);
  };

  return (
    <div className="navBurguer_container">
      <nav className="navBurguer">
        <div onClick={openNavBurber}>
          <label className="navBurguer_optionTitle">
            {opciones[seleccion]}
          </label>

          <span>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaBars />
            </IconContext.Provider>
          </span>
        </div>

        <ul className="navBurguerSide">
          <h5>Selecciona</h5>

          {opciones.map((op, index) => {
            return (
              <li
                className="whiteBoxShadow"
                key={index}
                onClick={() => selectOne(index)}
              >
                {op}
              </li>
            );
          })}
        </ul>
      </nav>

      <div>{content[seleccion]}</div>
    </div>
  );
}

export default NavBurguer;
