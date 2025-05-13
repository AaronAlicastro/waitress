import React from "react";
import "./styles/tablesMarked.css";

function TablesMarked(props) {
  return (
    <div className="roundTable_container">
      {props.tableList.map((tb, i) => {
        return (
          <div
            key={"roundTable" + i}
            className="roundTable"
            onClick={() => props.onClick(i)}
          >
            {tb.number}
          </div>
        );
      })}
    </div>
  );
}

export default TablesMarked;
