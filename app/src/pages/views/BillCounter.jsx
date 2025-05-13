import React from "react";
import "./components/styles/billCounter.css";
import { IconContext } from "react-icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import BotonAcc from "./components/BotonAcc";
import { ObjectsInteractivesOver } from "../../logic/generalFunctions";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import { useAlert } from "react-alert";

const getInputWorked = () => {
  return document.getElementById("input_objectsInteractivesOver");
};

const quitDragOver = () => {
  for (const child of document.querySelectorAll(".draggingOver")) {
    child.classList.remove("draggingOver");
  }
};

function Billcounter(props) {
  const alert = useAlert();
  const objectsInteractivesOver = new ObjectsInteractivesOver();
  const currentDivPosition = { pageX: 0, pageY: 0 };
  const objectsUsed = { drag: null, over: null };

  const rejectWork = () => props.goToView("addProductToTable");

  const sendData = () => {
    const inputWorked = getInputWorked();
    const amount = parseInt(inputWorked.value.trim());

    if (amount) {
      props.goToView("editProctToOrder", {
        productCount: amount,
      });
    } else alert.show("No has colocado la cantidad");
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
    document.body.style.overflow = "auto";
    e.target.style.zIndex = "1000";
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
        if (e.target === inputWorked) onDrop();
        else onDropInput();
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
        style={{ zIndex: "100" }}
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
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack onClick={rejectWork} />

      <div className="billcounter">
        <div className="flexRowCenter flexAllGap">
          <BotonAcc onClick={() => sendData()}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaCheck />
            </IconContext.Provider>
          </BotonAcc>
          <span>${props.querys.productChoosen.price.toLocaleString()}</span>
        </div>

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
              style={{ zIndex: "100" }}
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

      <Footer />
    </div>
  );
}

export default Billcounter;
