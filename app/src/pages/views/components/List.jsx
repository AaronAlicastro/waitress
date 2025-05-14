import React from "react";
import "./styles/list.css";

function List({ list = [], itemStyles = [], onClick = () => {}, constData }) {
  return (
    <ul className="listItems">
      {list.map((ls, i) => {
        return (
          <li
            key={i}
            className="listItems_item"
            style={itemStyles[ls] || {}}
            onClick={() => onClick(i, ls)}
          >
            {ls}
          </li>
        );
      })}
      {constData}
    </ul>
  );
}

export default List;
