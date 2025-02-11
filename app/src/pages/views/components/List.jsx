import React from "react";
import "./styles/list.css";

function List({ list, onClick, constData }) {
  return (
    <ul className="listItems">
      {list.map((ls, i) => {
        return (
          <li key={i} className="listItems_item" onClick={() => onClick(ls)}>
            {ls}
          </li>
        );
      })}
      {constData}
    </ul>
  );
}

export default List;
