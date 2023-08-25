import React from "react";
import "./styles/list.css";

function List({ list, onClick }) {
    let key = 100;
    return <div className="listItems">
        {
            list.map(ls => {
                key++;
                return <div
                    key={key}
                    className="listItems_item"
                    onClick={() => onClick(ls)}
                >
                    {ls}
                </div>
            })
        }
    </div>
}

export default List;