import React from "react";
import "./styles/billCounter.css";
import { IconContext } from "react-icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import BotonAcc from "./BotonAcc";
import { ObjectsInteractivesOver } from "../../../logic/generalFunctions";

const getInputWorked = () => {
  return document.getElementById("input_objectsInteractivesOver");
};

const quitDragOver = () => {
  for (const child of document.querySelectorAll(".draggingOver")) {
    child.classList.remove("draggingOver");
  }
};

function Billcounter(props) {
  const objectsInteractivesOver = new ObjectsInteractivesOver();
  const currentDivPosition = { pageX: 0, pageY: 0 };
  const objectsUsed = { drag: null, over: null };

  const sendData = () => {
    const inputWorked = getInputWorked();
    props.answer(inputWorked.value || false);
  };

  /*
    functions for drag events
  */

  // initial event, this save the objects selected
  const onDragStart = (e) => {
    document.body.style.overflow = "hidden";
    e.target.style.zIndex = "1";
    objectsUsed.drag = e.target;
    currentDivPosition.pageX = e.target.offsetLeft;
    currentDivPosition.pageY = e.target.offsetTop;
  };

  // one object is over other one
  const onDragOver = (e) => {
    e.preventDefault();

    if (objectsUsed.drag !== e.target) {
      e.target.classList.add("draggingOver");
      objectsUsed.over = e.target;
    }
  };

  /*
    onDropInput is for add
    onDrop is for less
  */

  // associated with the div
  const onDrop = () => {
    const inputWorked = getInputWorked();

    if (objectsUsed.drag === inputWorked) {
      const currentValue = parseInt(inputWorked.value);
      const discount = parseInt(objectsUsed.over.innerText);

      const less = currentValue - discount;
      inputWorked.value = less > 0 ? less : 0;
    }
  };

  // associated with the input
  const onDropInput = () => {
    if (objectsUsed.drag.className.includes("billBallNumbers")) {
      const inputWorked = getInputWorked();
      const divNumberChoosen = parseInt(objectsUsed.drag.innerText);

      const plus = parseInt(inputWorked.value) + divNumberChoosen;
      inputWorked.value = plus;
    }
  };

  // drag event in action (moving it)
  const dragginObject = (e, isToucheEvent = false) => {
    let pageX = e.pageX;
    let pageY = e.pageY;

    if (isToucheEvent) {
      pageX = e.touches[0].pageX;
      pageY = e.touches[0].pageY;
      objectsInteractivesOver.setBillCounter(getInputWorked(), e.target);

      const interaccion = objectsInteractivesOver.verifyInteraction(
        e.target,
        pageX,
        pageY
      );

      if (interaccion) {
        onDragOver({
          preventDefault: () => {},
          target: interaccion,
        });
      } else quitDragOver();
    }

    pageX -= 40;
    pageY -= 40;

    e.target.style.left = pageX + "px";
    e.target.style.top = pageY + "px";
  };

  // final event, this set the original data again
  const onDragEnd = (e, isToucheEvent = false) => {
    e.target.style.zIndex = "var(--bigZindex)";
    document.body.style.overflow = "auto";
    objectsUsed.drag.style.left = currentDivPosition.pageX + "px";
    objectsUsed.drag.style.top = currentDivPosition.pageY + "px";

    if (isToucheEvent) {
      const inputWorked = getInputWorked();
      const pageX = e.changedTouches[0].pageX;
      const pageY = e.changedTouches[0].pageY;
      objectsInteractivesOver.setBillCounter(inputWorked, e.target);

      const interaccion = objectsInteractivesOver.verifyInteraction(
        e.target,
        pageX,
        pageY
      );

      if (interaccion) {
        if (e.target === inputWorked) onDrop({ target: interaccion });
        else onDropInput({ target: inputWorked });
      }
    }
  };

  /*
    CREATORS
  */

  const createBallNumber = (number) => {
    return (
      <div
        className="billBallNumbers"
        id={"billBallNumbers" + number}
        // phones
        onTouchStart={onDragStart}
        onTouchMove={(e) => dragginObject(e, true)}
        onTouchEnd={(e) => onDragEnd(e, true)}
        // computers
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={quitDragOver}
        onDrag={dragginObject}
        onDragEnd={onDragEnd}
        onDrop={onDrop}
        draggable
      >
        {number}
      </div>
    );
  };

  return (
    <div className="billcounter">
      <div className="flexRowCenter">
        <div className="flexRowAround min480">
          <BotonAcc onClick={() => props.answer(false)}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaTimes />
            </IconContext.Provider>
          </BotonAcc>

          <BotonAcc onClick={() => sendData()}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaCheck />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      </div>

      <h1 className="infoGeneral_tilte">Arrastra, sumar | restar</h1>
      <h3 className="infoGeneral_subtitle">( {props.producName} )</h3>

      <div className="ballContainer_box">
        <div className="ballContainer_numeric">
          {createBallNumber(1)}
          {createBallNumber(2)}
          {createBallNumber(3)}
        </div>

        <div className="ballContainer_numeric">
          <input
            type="text"
            value="0"
            id="input_objectsInteractivesOver"
            disabled
            draggable
            // phones
            onTouchStart={onDragStart}
            onTouchMove={(e) => dragginObject(e, true)}
            onTouchEnd={(e) => onDragEnd(e, true)}
            // computers
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragLeave={quitDragOver}
            onDrag={dragginObject}
            onDragEnd={onDragEnd}
            onDrop={onDropInput}
          />
        </div>

        <div className="ballContainer_numeric">
          {createBallNumber(5)}
          {createBallNumber(7)}
          {createBallNumber(10)}
        </div>
      </div>
    </div>
  );
}

export default Billcounter;
