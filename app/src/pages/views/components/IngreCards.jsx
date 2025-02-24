import React from "react";
import "./styles/ingreCards.css";

function IngreCards({ ingrex, action }) {
  return (
    <ul className="ingreCardsContainer">
      {ingrex.map((inx, i) => {
        return (
          <li key={"ingres" + i} onClick={() => action(inx)}>
            {inx.name} (${inx.value.toLocaleString()})
          </li>
        );
      })}
    </ul>
  );
}

export default IngreCards;
