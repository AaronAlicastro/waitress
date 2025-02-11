import React from "react";
import "./styles/sideBoardFloat.css";
import { IconContext } from "react-icons";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

function SideBoardFloat(props) {
  const logOut = () => {
    const pre = window.confirm("¿Desea cerrar sesión?");
    if (pre) window.history.go(0);
  };
  const openCloseIt = (open = true) => {
    const sideBoardFloat = document.querySelector(".sideBoardFloat");
    const closerSpan = document.querySelectorAll(".closerSpan");

    sideBoardFloat.style.animation = open
      ? "openSideBoard .8s forwards"
      : "closeSideBoard .8s forwards";
    closerSpan[0].style.display = open ? "none" : "flex";
    closerSpan[1].style.display = open ? "flex" : "none";
  };
  const editUser = () => {
    openCloseIt(false);
    props.editUser();
  };

  return (
    <section className="sideBoardFloat">
      <div className="sideBoardFloat_container">
        <h1>Waitress</h1>
        <h4>{props.userName}</h4>
        <div>{props.userId}</div>
        <ul className="account_events">
          <li onClick={editUser}>Editar cuenta</li>
          <li onClick={logOut}>Cerrar sesión</li>
        </ul>
      </div>

      <div className="sideBoardFloat_closer">
        <span className="closerSpan" onClick={() => openCloseIt(true)}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaAngleDown />
          </IconContext.Provider>
        </span>

        <span className="closerSpan" onClick={() => openCloseIt(false)}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaAngleUp />
          </IconContext.Provider>
        </span>
      </div>
    </section>
  );
}

export default SideBoardFloat;
