import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaBars
} from "react-icons/fa";
import "./styles/navBurguer.css";

function NavBurguer({ opciones, content, Pseleccion }) {
    let key = 0;
    let [seleccion, setSeleccion] = useState(Pseleccion || 0);

    return <div>
        <nav className="navBurguer">
            <div onClick={() => {
                let navbur = document.querySelector(".navBurguerSide");
                navbur.style.animation = "openNavBurguerSide .4s forwards";
            }}>
                <ul className="navBurguer_options">
                    <li> {opciones[seleccion]} </li>
                </ul>
                <span className="navBurguer_burguer">
                    <span className="closerSpan_2">
                        <IconContext.Provider value={{ size: "0.7em" }}>
                            <FaBars />
                        </IconContext.Provider>
                    </span>
                </span>
            </div>

            <ul className="navBurguerSide">
                {
                    opciones.map((op, i) => {
                        key++;
                        return <li key={key} onClick={() => {
                            document.querySelector(".navBurguerSide").style.animation = "closeNavBurguerSide 0s forwards";
                            setSeleccion(i);
                        }}>{op}</li>;
                    })
                }
            </ul>
        </nav>

        <div className="navBurguer_content">
            {content[seleccion]}
        </div>
    </div>
}

export default NavBurguer;