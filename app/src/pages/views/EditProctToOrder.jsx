import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaUndoAlt, FaCheck } from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import BotonAcc from "./components/BotonAcc";
import IngreCards from "./components/IngreCards";

const createIngreCopy = (ingre) => {
  return [...ingre];
};

function EditProctToOrder(props) {
  const [without, setWithout] = useState([]); // to become individual the new order
  const [currentFinalPrice, setCurrentFinalPrice] = useState(
    props.productChoosen.price * props.productCount
  );
  const [ingreWorked, setIngreWorked] = useState(
    createIngreCopy(props.productChoosen.ingre)
  );

  const renderUndoButton = () => {
    if (ingreWorked.length !== props.productChoosen.ingre.length) {
      return (
        <BotonAcc
          onClick={() => {
            setWithout([]);
            setCurrentFinalPrice(
              props.productChoosen.price * props.productCount
            );
            setIngreWorked(createIngreCopy(props.productChoosen.ingre));
          }}
        >
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaUndoAlt />
          </IconContext.Provider>
        </BotonAcc>
      );
    }

    return "";
  };

  const confirmAll = () => {
    props.goToView("addProductToTable", {
      productsAsked: [
        ...props.productsAsked,
        {
          product: props.productChoosen.name,
          productCount: props.productCount,
          totalProduct: currentFinalPrice,
          without,
        },
      ],
      total: props.total + currentFinalPrice,
    });
  };

  const deleteIngre = (oneIngre) => {
    setWithout([...without, oneIngre.name]);
    setCurrentFinalPrice(
      currentFinalPrice - oneIngre.value * props.productCount
    );
    setIngreWorked(ingreWorked.filter((inx) => inx.name !== oneIngre.name));
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.userName}
        userId={props.userId}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack
        onClick={() => {
          props.goToView(props.lastView.view, props.lastView.dataView);
        }}
      />

      <h2 className="infoGeneral_tilte">
        {props.productChoosen.name}, elimina ingredientes
      </h2>
      <h3 className="infoGeneral_details">
        Has elegido ({props.productCount}) ~ $
        {currentFinalPrice.toLocaleString()}
      </h3>

      <div className="flexRowCenter">
        <div className="flexRowAround min480">
          {renderUndoButton()}

          <BotonAcc onClick={confirmAll}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaCheck />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      </div>

      <IngreCards
        ingrex={ingreWorked}
        action={(oneIngre) => deleteIngre(oneIngre)}
      />

      <Footer />
    </div>
  );
}

export default EditProctToOrder;
