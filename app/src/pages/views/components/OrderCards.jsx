import React from "react";
import "./styles/orderCards.css";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";

function OrderCards({ productsAsked, onClick }) {
  const renderWithout = (without) => {
    if (without.length) {
      return (
        <input readOnly type="text" defaultValue={"[ " + without + " ]"} />
      );
    }
    return "";
  };

  return (
    <div className="orderCard_container">
      {productsAsked.map((pr, i) => {
        return (
          <div key={i} className="orderCard_card">
            <span onClick={() => onClick(pr, i)}>
              <IconContext.Provider value={{ size: "0.4em" }}>
                <FaTimes />
              </IconContext.Provider>
            </span>

            <input
              readOnly
              type="text"
              defaultValue={`( ${pr.productCount} ) ${pr.product}`}
            />

            <input
              readOnly
              type="text"
              defaultValue={pr.totalProduct.toLocaleString()}
            />

            {renderWithout(pr.without)}
          </div>
        );
      })}
    </div>
  );
}

export default OrderCards;
