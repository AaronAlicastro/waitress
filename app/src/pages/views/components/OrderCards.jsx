import React from "react";
import "./styles/orderCards.css";
import { IconContext } from "react-icons";
import { FaTimes } from "react-icons/fa";
import { setOrderStatusStyle } from "../../../logic/generalFunctions";

function OrderCards({
  isWaitress = true,
  productsAsked,
  clickOnClose = () => {},
  clickOnStatus = () => {},
  clickOnWithout = () => {},
}) {
  const renderWithout = (productName, without) => {
    if (without.length) {
      return (
        <input
          onClick={() => clickOnWithout(productName, without)}
          className="orderCard_input_without"
          readOnly
          type="text"
          defaultValue={"[ " + without + " ]"}
        />
      );
    }
    return "";
  };

  const renderTotal = (pr) => {
    if (isWaitress) {
      return (
        <input
          readOnly
          className="orderCard_card_bigInput"
          type="text"
          defaultValue={"$" + pr.totalProduct.toLocaleString()}
        />
      );
    }
    return "";
  };

  const renderCloseSpan = (pr, i) => {
    if (isWaitress) {
      return (
        <span onClick={() => clickOnClose(pr, i)}>
          <IconContext.Provider value={{ size: "0.4em" }}>
            <FaTimes />
          </IconContext.Provider>
        </span>
      );
    }
    return "";
  };

  return (
    <div className="orderCard_container">
      {productsAsked.map((pr, i) => {
        return (
          <div key={i} className="orderCard_card">
            <label
              style={setOrderStatusStyle(pr.status)}
              onClick={() => clickOnStatus(pr, i)}
            >
              {pr.status}
            </label>

            {renderCloseSpan(pr, i)}

            <input
              readOnly
              className={isWaitress ? "" : "orderCard_card_mediumInput"}
              type="text"
              defaultValue={`( ${pr.productCount} ) ${pr.product}`}
            />

            {renderTotal(pr)}
            {renderWithout(pr.product, pr.without)}
          </div>
        );
      })}
    </div>
  );
}

export default OrderCards;
