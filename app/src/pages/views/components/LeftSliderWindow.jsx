import React from "react";
import "./styles/leftSliderWindow.css";

const getContainer = (id) => {
  return document.querySelector("#" + id);
};

export const openLeftSliderWindow = (id) => {
  const slider = getContainer(id);
  slider.style.animation = "openLeftSliderWindow .4s forwards";
};

export const closeLeftSliderWindow = (id) => {
  const slider = getContainer(id);
  slider.style.animation = "closeLeftSliderWindow .4s forwards";
};

export function LeftSliderWindow({ id, children }) {
  return (
    <div id={id} className="leftSliderWindow_container">
      {children}
    </div>
  );
}
