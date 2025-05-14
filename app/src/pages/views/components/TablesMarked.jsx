import React from "react";
import "./styles/tablesMarked.css";

function TablesMarked({ tableList = [], styleList = [], onClick = () => {} }) {
  return (
    <div className="roundTable_container">
      {tableList.map((tb, i) => {
        return (
          <div
            key={"roundTable" + i}
            className="roundTable"
            style={styleList[tb._id] || {}}
            onClick={() => onClick(i)}
          >
            {tb.number}
          </div>
        );
      })}
    </div>
  );
}

export default TablesMarked;
