import React, { useState } from "react";
import "./styles/showInfoGeneral.css";
import { IconContext } from "react-icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import BotonAcc from "./BotonAcc";
import { ObjectsInteractivesOver } from "../../../logic/generalFunctions";

function Billcounter(props) {
  let [objectChoosen, setObjectChoosen] = useState(0);
  let [currentDivChoosen, setCurrentDivChoosen] = useState({});
  let [currentSuma, setCurrentSuma] = useState(0);
  let [inputWorked, setInputWorked] = useState(null);
  let objectsInteractivesOver = new ObjectsInteractivesOver();

  let onDragStart = (e) => {
    setCurrentDivChoosen(e.target);
    setObjectChoosen(parseInt(e.target.innerText));
  };
  let onDrag = (e, toucheEvent) => {
    let clientX = e.target.clientX || 0;
    let clientY = e.target.clientY || 0;
    if (toucheEvent) {
      inputWorked = document.getElementById("input_objectsInteractivesOver");

      if (e.target == inputWorked)
        objectsInteractivesOver.setObjectsWorked([
          ...document.querySelectorAll(".billCounterNumbers"),
        ]);
      else objectsInteractivesOver.setObjectsWorked([inputWorked]);

      clientX = e.changedTouches[0].clientX || 0;
      clientY = e.changedTouches[0].clientY || 0;

      let interaccion = objectsInteractivesOver.verifyInteraction(
        e.target,
        clientX,
        clientY
      );
      if (interaccion) {
        onDragOver({
          preventDefault: () => {},
          target: interaccion,
        });
      }
      setInputWorked(inputWorked);
    }

    currentDivChoosen.classList.add("setPositionAbsolute");
    e.target.style.left = clientX - e.target.offsetWidth / 2 + "px";
    e.target.style.top = clientY - e.target.offsetHeight / 2 + "px";
  };
  let onDragEnd = (e, toucheEvent) => {
    currentDivChoosen.classList.remove("setPositionAbsolute");
    for (let child of document.querySelectorAll(".draggingOver")) {
      child.classList.remove("draggingOver");
    }
    if (toucheEvent) {
      let clientX = e.changedTouches[0].clientX || 0;
      let clientY = e.changedTouches[0].clientY || 0;
      let interaccion = objectsInteractivesOver.verifyInteraction(
        e.target,
        clientX,
        clientY
      );
      if (interaccion) {
        if (e.target == inputWorked) onDrop({ target: interaccion });
        else
          onDropInput({
            target: inputWorked,
          });
      }
    }
  };
  let onDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add("draggingOver");
  };
  let onDrop = (e) => {
    if (inputWorked == currentDivChoosen) {
      if (parseInt(inputWorked.value) > 0) {
        currentSuma =
          parseInt(inputWorked.value) - parseInt(e.target.innerText);
        if (currentSuma < 0) {
          inputWorked.value = 0;
          setCurrentSuma(0);
        } else {
          inputWorked.value = currentSuma.toLocaleString();
          setCurrentSuma(currentSuma);
        }
      }
    }
  };
  let onDropInput = (e) => {
    if (e.target != currentDivChoosen) {
      currentSuma = parseInt(e.target.value) + objectChoosen;
      e.target.value = currentSuma.toLocaleString();
      setInputWorked(e.target);
      setCurrentSuma(currentSuma);
    }
  };
  let sendData = () => {
    if (inputWorked) return parseInt(inputWorked.value);
    return false;
  };

  return (
    <div className="billCounter_container">
      <h2 className="infoGeneral_details">Arrastra, sumar | restar</h2>
      <h2 className="infoGeneral_details">{props.title}</h2>
      <div className="infoGeneral_actionsToDo" draggable="false">
        <div
          className="billCounterNumbers"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          onDragStart={onDragStart}
          draggable
        >
          1
        </div>
        <div
          className="billCounterNumbers"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          onDragStart={onDragStart}
          draggable
        >
          2
        </div>
        <div
          className="billCounterNumbers"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          onDragStart={onDragStart}
          draggable
        >
          3
        </div>
      </div>

      <div className="flexRowCenter" style={{ minHeight: "200px" }}>
        <input
          type="text"
          value={currentSuma}
          id="input_objectsInteractivesOver"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          disabled
          draggable
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDrop={onDropInput}
        />
      </div>

      <div className="infoGeneral_actionsToDo" draggable="false">
        <div
          className="billCounterNumbers"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          onDragStart={onDragStart}
          draggable
        >
          5
        </div>
        <div
          className="billCounterNumbers"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          onDragStart={onDragStart}
          draggable
        >
          7
        </div>
        <div
          className="billCounterNumbers"
          // phones
          onTouchStart={onDragStart}
          onTouchEnd={(e) => onDragEnd(e, true)}
          onTouchMove={(e) => onDrag(e, true)}
          // computers
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          onDrag={onDrag}
          onDragStart={onDragStart}
          draggable
        >
          10
        </div>
      </div>

      <div
        className="infoGeneral_actionsToDo"
        style={{ marginTop: "var(--general_space)" }}
      >
        <BotonAcc onClick={(e) => props.answer(false)}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaTimes />
          </IconContext.Provider>
        </BotonAcc>

        <BotonAcc onClick={(e) => props.answer(sendData())}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaCheck />
          </IconContext.Provider>
        </BotonAcc>
      </div>
    </div>
  );
}

export default Billcounter;
