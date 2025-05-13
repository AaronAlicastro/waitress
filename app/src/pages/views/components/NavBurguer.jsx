import React, { useState } from "react";
import "./styles/navBurguer.css";
import { IconContext } from "react-icons";
import { FaBars } from "react-icons/fa";
import {
  closeLeftSliderWindow,
  LeftSliderWindow,
  openLeftSliderWindow,
} from "./LeftSliderWindow";

function NavBurguer({ id, opciones, content, Pseleccion }) {
  const [seleccion, setSeleccion] = useState(Pseleccion || 0);
  const sliderId = id + "_LeftSliderWindow";

  const openNavBurber = () => openLeftSliderWindow(sliderId);

  const selectOne = (index) => {
    closeLeftSliderWindow(sliderId);
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

        <LeftSliderWindow id={sliderId}>
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
        </LeftSliderWindow>
      </nav>

      <div>{content[seleccion]}</div>
    </div>
  );
}

export default NavBurguer;
