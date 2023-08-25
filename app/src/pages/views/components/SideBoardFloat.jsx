import React from "react";
import { IconContext } from "react-icons";
import {
    FaAngleDown,
    FaAngleUp
} from "react-icons/fa";
import "./styles/sideBoardFloat.css";

function SideBoardFloat() {

    return <section className="sideBoardFloat">
        <div className="sideBoardFloat_container">
            <h1>Waitress</h1>
            <h3>My name</h3>
            <div>idWaitress234d34</div>
            <ul>
                <li>Cerrar sesión</li>
                <li>Eliminar cuenta</li>
            </ul>
        </div>

        <div className="sideBoardFloat_closer">
            <span className="closerSpan" onClick={ e => {
                let sideBoardFloat = document.querySelector(".sideBoardFloat");
                let closerSpan = document.querySelectorAll(".closerSpan");
                sideBoardFloat.style.animation = "openSideBoard 2s forwards";
                closerSpan[0].style.display = "none";
                closerSpan[1].style.display = "flex";
            }}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaAngleDown />
                </IconContext.Provider>
            </span>
            <span className="closerSpan" onClick={ e => {
                let sideBoardFloat = document.querySelector(".sideBoardFloat");
                let closerSpan = document.querySelectorAll(".closerSpan");
                sideBoardFloat.style.animation = "closeSideBoard 2s forwards";
                closerSpan[1].style.display = "none";
                closerSpan[0].style.display = "flex";
            }}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaAngleUp />
                </IconContext.Provider>
            </span>
        </div>
    </section>
}

export default SideBoardFloat;