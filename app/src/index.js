import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";

const options = {
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.FADE,
};

const AlertTemplate = ({ style, __, message, close }) => (
  <article style={style} className="alertaPersonalizada">
    <span className="alertaPersonalizada_span">{message}</span>
    <span onClick={close}>
      <IconContext.Provider value={{ size: ".6em" }}>
        <FaTimes />
      </IconContext.Provider>
    </span>
  </article>
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App tab="home" />
  </AlertProvider>
);

// not reload
window.addEventListener("beforeunload", (e) => {
  e.preventDefault();
  e.returnValue = ""; // for chorme
});
