import React from "react";
import { IconContext } from "react-icons";
import {
    FaCheck,
    FaTimes
} from "react-icons/fa";
import "./styles/showInfoGeneral.css";
import BotonAcc from "./BotonAcc";

function Billcounter(props) {
    let currentDivChoosen = {}, inputWorked = null;
    let onDragStart = e => {
        currentDivChoosen = e.target;
        e.dataTransfer.setData("objectChoosen", e.target.innerText);
    };
    let onDrag = e => {
        currentDivChoosen.classList.add("setPositionAbsolute");
        e.target.style.left = (e.clientX - 40) + "px";
        e.target.style.top = (e.clientY - 40) + "px";
    };
    let onDragEnd = () => {
        currentDivChoosen.classList.remove("setPositionAbsolute");
        for (let child of document.querySelectorAll(".draggingOver")) {
            child.classList.remove("draggingOver");
        }
    };
    let onDragOver = e => {
        e.preventDefault();
        e.target.classList.add("draggingOver");
    }
    let onDrop = e => {
        if (inputWorked == currentDivChoosen) {
            if (parseInt(inputWorked.value) > 0) {
                let suma = parseInt(inputWorked.value) - parseInt(e.target.innerText);
                if (suma < 0) inputWorked.value = 0;
                else inputWorked.value = (suma).toLocaleString();
            }
        }
    }
    let sendData = () => {
        if (inputWorked) return parseInt(inputWorked.value);
        return false;
    }

    return <div className="billCounter_container">
        <h2 className="infoGeneral_details">Arrastra, sumar | restar</h2>
        <h2 className="infoGeneral_details">{props.title}</h2>
        <div className="infoGeneral_actionsToDo" draggable="false" >
            <div
                className="billCounterNumbers"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragStart={onDragStart}
                draggable
            >1</div>
            <div
                className="billCounterNumbers"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragStart={onDragStart}
                draggable
            >2</div>
            <div
                className="billCounterNumbers"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragStart={onDragStart}
                draggable
            >3</div>
        </div>
        <div className="flexRowCenter" style={{ minHeight: "200px" }}>
            <input type="text" value={0}
                disabled
                draggable
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDrop={e => {
                    if (e.target != currentDivChoosen) {
                        inputWorked = e.target;
                        let suma = parseInt(e.target.value) + parseInt(e.dataTransfer.getData("objectChoosen"));
                        e.target.value = (suma).toLocaleString();
                    }
                }}
            />
        </div>
        <div className="infoGeneral_actionsToDo" draggable="false" >
            <div
                className="billCounterNumbers"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragStart={onDragStart}
                draggable
            >5</div>
            <div
                className="billCounterNumbers"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragStart={onDragStart}
                draggable
            >7</div>
            <div
                className="billCounterNumbers"
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDrag={onDrag}
                onDragStart={onDragStart}
                draggable
            >10</div>
        </div>

        <div className="infoGeneral_actionsToDo" style={{marginTop: "var(--general_space)"}}>
            <BotonAcc onClick={e => props.answer(false)}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaTimes />
                </IconContext.Provider>
            </BotonAcc>

            <BotonAcc onClick={e => props.answer(sendData()) }>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaCheck />
                </IconContext.Provider>
            </BotonAcc>
        </div>
    </div>
}

export default Billcounter;