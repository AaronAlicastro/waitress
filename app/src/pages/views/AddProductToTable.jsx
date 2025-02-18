import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaCheck, FaTimes } from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";
import { useAlert } from "react-alert";

function AddProductToTable(props) {
  const alert = useAlert();
  const [view, setView] = useState("principal");
  let total = props.total + 0;

  const editProctToOrder = (ls) => {
    props.goToView("editProctToOrder", {
      productChoosen: props.querys.products.find((pr) => pr.name === ls),
      productsAsked: props.productsAsked,
      total,
    });
  };

  const finishOrder = () => {
    if (props.productsAsked.length) {
      const pre = window.confirm("¿Confirma el pedido?");

      if (pre) {
        props.goToView(false, {}, (go) => {
          const data = {
            manager: props.querys.user.manager,
            table: props.querys.tableChoosen._id,
            tableNumber: props.querys.tableChoosen.number,
            productsAsked: props.productsAsked,
            total,
          };

          props.querys.createOrder(data, (somethingWrong) => {
            if (somethingWrong) alert.show("Error, comprueba tu internet");
            else alert.show("Arriba pedido ¡!");

            go("tableListener", {});
          });
        });
      }
    } else alert.show("Uhm, selecciona un producto primero a la orden");
  };

  const deplyList = {
    principal: () =>
      props.productsAsked.length ? (
        <div>
          <div className="flexRowCenter">total: {total}</div>
          {props.productsAsked
            .sort(() => -1)
            .map((pr, i) => {
              return (
                <div className="flexRowAround" key={"without" + i}>
                  <label>
                    ({pr.productCount}) {pr.product}
                    {pr.without.length ? (
                      <div style={{ marginTop: "var(--general_space)" }}>
                        {" "}
                        Sin: [ {pr.without + ""} ]{" "}
                      </div>
                    ) : (
                      ""
                    )}
                  </label>
                  <span>{pr.totalProduct}</span>
                  <button
                    className="general_btn"
                    onClick={() => {
                      total -= pr.totalProduct;
                      props.productsAsked.splice(i, 1);

                      if (view === "principal") setView("changeData");
                      else setView("principal");
                    }}
                  >
                    <IconContext.Provider value={{ size: "0.7em" }}>
                      <FaTimes />
                    </IconContext.Provider>
                  </button>
                </div>
              );
            })}
        </div>
      ) : (
        ""
      ),
    changeData: () => deplyList.principal(),
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser", {})}
      />
      <FloatBack
        onClick={() => {
          const pre = window.confirm("¿Desea cancelar el pedido?");
          if (pre) props.goToView("tableListener", {});
        }}
      />

      <h2 className="infoGeneral_tilte">Añade Producto | finaliza</h2>

      <div className="flexRowCenter">
        <BotonAcc onClick={finishOrder}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaCheck />
          </IconContext.Provider>
        </BotonAcc>
      </div>

      <List
        list={props.querys.products.map((pr) => pr.name)}
        onClick={editProctToOrder}
      />

      {deplyList[view]()}

      <Footer />
    </div>
  );
}

export default AddProductToTable;
