import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaUndoAlt, FaCheck, FaTimes } from "react-icons/fa";
import "./components/styles/forms.css";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import Billcounter from "./components/BillCounter";
import BotonAcc from "./components/BotonAcc";
import { areEquals } from "../../logic/generalFunctions";

function EditProctToOrder(props) {
  const [view, setView] = useState("billCounter");
  // mientras is to avoid editing the principal product
  const mientras = [...props.productChoosen.ingre];
  const [ingreWorked, setIngreWorked] = useState(mientras);

  // this is the new order that the waiter is working on
  const [currentProductsAsked, setCurrentProductsAsked] = useState([]);
  const [without, setWithout] = useState([]); // to become individual the new order

  // to calculate the total new order
  const [totalProduct, setTotalProduct] = useState(0); // current product's price in base of customer's order
  const [productCount, setProductCount] = useState(0); // the current count of the current customer's order
  const [currentProductCount, setCurrentProductCount] = useState(1); // to follow each order as individual order
  const [currentTotal, setCurrentTotal] = useState(0); // to add the last total to the current total.

  const addNewProductAsked = () => {
    currentProductsAsked.push({
      product: props.productChoosen.name,
      productCount: 1,
      totalProduct,
      without,
    });
    setCurrentProductsAsked(currentProductsAsked);
  };
  const addProductAskedOlder = () => {
    const allWithout = currentProductsAsked.map((pr) => pr.without);
    let withoutEdited = false;

    allWithout.find((wh, i) => {
      if (areEquals(wh, without)) {
        withoutEdited = true;
        currentProductsAsked[i].productCount += 1;
        currentProductsAsked[i].totalProduct += totalProduct;
        return true;
      }
      return false;
    });
    if (!withoutEdited) addNewProductAsked();
    else setCurrentProductsAsked(currentProductsAsked);
  };

  const confirmIngreChange = (change) => {
    if (view == "confirmIngre") setView("confirmIngreChange");
    else setView("confirmIngre");
    setIngreWorked(change);
  };

  const viewToShow = {
    billCounter: () => (
      <Billcounter
        producName={props.productChoosen.name}
        answer={(amount) => {
          if (amount) {
            setProductCount(amount);
            setTotalProduct(props.productChoosen.price);
            setView("confirmIngre");
          } else props.goToView(props.lastView.view, props.lastView.dataView);
        }}
      />
    ),
    confirmIngre: () => {
      return (
        <div>
          <h2 className="infoGeneral_details">
            Has elegido ({productCount}) productos
          </h2>
          <h3 className="infoGeneral_details">
            Confirma los ingredientes del n° ({currentProductCount}){" "}
          </h3>
          {ingreWorked.map((ingre, i) => {
            return (
              <div key={"ingre" + i} className="flexRowCenter">
                <span style={{ marginRight: "var(--general_space)" }}>
                  {ingre.name}
                </span>
                <button
                  className="btn_form"
                  onClick={() => {
                    const ingreQuitado = ingreWorked.splice(i, 1)[0];
                    without.push(ingreQuitado.name);

                    setTotalProduct(totalProduct - ingreQuitado.value);
                    setWithout(without);
                    confirmIngreChange(ingreWorked);
                  }}
                >
                  <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaTimes />
                  </IconContext.Provider>
                </button>
              </div>
            );
          })}
          <div className="flexRowAround">
            {ingreWorked.length != props.productChoosen.ingre.length ? (
              <BotonAcc
                onClick={() => {
                  const mientras = [...props.productChoosen.ingre];
                  setTotalProduct(props.productChoosen.price);
                  setWithout([]);
                  confirmIngreChange(mientras);
                }}
              >
                <IconContext.Provider value={{ size: "0.7em" }}>
                  <FaUndoAlt />
                </IconContext.Provider>
              </BotonAcc>
            ) : (
              ""
            )}

            <BotonAcc
              onClick={() => {
                if (currentProductCount < productCount) {
                  const mientras = [...props.productChoosen.ingre];
                  if (currentProductsAsked.length) addProductAskedOlder();
                  else addNewProductAsked();

                  setCurrentProductCount(currentProductCount + 1);
                  setWithout([]);
                  confirmIngreChange(mientras);
                } else {
                  addProductAskedOlder();
                  props.goToView("addProductToTable", {
                    productsAsked: [
                      ...props.productsAsked,
                      ...currentProductsAsked,
                    ],
                    total:
                      props.total +
                      currentTotal +
                      totalProduct /* this last value add the last price selected by the user. That value will not be added twice because the state will not be used */,
                  });
                }
                setCurrentTotal(currentTotal + totalProduct);
                setTotalProduct(props.productChoosen.price);
              }}
            >
              <IconContext.Provider value={{ size: "0.7em" }}>
                <FaCheck />
              </IconContext.Provider>
            </BotonAcc>
          </div>
        </div>
      );
    },
    confirmIngreChange: () => viewToShow.confirmIngre(),
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.userName}
        userId={props.userId}
        editUser={() => props.goToView("editUser", {})}
      />
      <FloatBack
        onClick={() => {
          props.goToView(props.lastView.view, props.lastView.dataView);
        }}
      />

      {viewToShow[view]()}

      <Footer />
    </div>
  );
}

export default EditProctToOrder;
