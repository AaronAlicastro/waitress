import React, { useState } from "react";
import "./components/styles/showInfoGeneral.css";
import { IconContext } from "react-icons";
import { FaUndoAlt, FaCheck, FaTrash } from "react-icons/fa";
import Footer from "./components/Footer";
import BotonAcc from "./components/BotonAcc";
import FloatBack from "./components/FloatBack";
import SideBoardFloat from "./components/SideBoardFloat";
import { useAlert } from "react-alert";
import OrderCards from "./components/OrderCards";

function createOrderCopy(order) {
  return {
    manager: order.manager,
    table: order.table,
    tableNumber: order.tableNumber,
    productsAsked: [...order.productsAsked],
    total: order.total,
  };
}

function EditOrDeleteOrder(props) {
  const alert = useAlert();
  const [currentOrderAsked, setCurrentOrderAsked] = useState(
    createOrderCopy(props.orderChoosen)
  );

  const reLoadPage = (base = false) => {
    setCurrentOrderAsked(
      createOrderCopy(base ? props.orderChoosen : currentOrderAsked)
    );
  };

  const quitProducFromList = (pr, index) => {
    currentOrderAsked.total -= pr.totalProduct;
    currentOrderAsked.productsAsked.splice(index, 1);
    reLoadPage();
  };

  const renderDeepList = () => {
    if (currentOrderAsked.productsAsked.length) {
      return (
        <OrderCards
          productsAsked={currentOrderAsked.productsAsked}
          onClick={(pr, index) => quitProducFromList(pr, index)}
        />
      );
    }

    return "";
  };

  const deleteOrderButton = () => {
    let pre = window.confirm("¿Desea eliminarlo?");
    if (pre) {
      props.goToView(false, {}, (fun) => {
        props.querys.orders.splice(props.orderChoosen_index, 1);

        const data = { _id: props.orderChoosen._id };

        props.querys.deleteOrder(data, (somethingWrong) => {
          if (somethingWrong) alert.show("Algo salio mal, revisa el internet");
          else alert.show("Eliminado con éxito");
          fun("tableListener", {});
        });
      });
    }
  };
  const editOrderButton = () => {
    const pre = window.confirm("¿Desea editarlo?");
    if (pre) {
      props.goToView(false, {}, (fun) => {
        props.querys.orders[props.orderChoosen_index].productsAsked =
          currentOrderAsked.productsAsked;
        props.querys.orders[props.orderChoosen_index].total =
          currentOrderAsked.total;

        props.querys.editOrder(currentOrderAsked, (somethingWrong) => {
          if (somethingWrong) alert.show("Algo salio mal, revisa el internet");
          else alert.show("Editado con éxito");
          fun("tableListener", {});
        });
      });
    }
  };

  const chargeEditOrderButton = () => {
    if (
      currentOrderAsked.productsAsked.length &&
      currentOrderAsked.productsAsked.length <
        props.orderChoosen.productsAsked.length
    ) {
      return (
        <BotonAcc onClick={editOrderButton}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaCheck />
          </IconContext.Provider>
        </BotonAcc>
      );
    }
    return "";
  };
  const chargeReLoadButton = () => {
    if (
      currentOrderAsked.productsAsked.length <
      props.orderChoosen.productsAsked.length
    ) {
      return (
        <BotonAcc onClick={() => reLoadPage(true)}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaUndoAlt />
          </IconContext.Provider>
        </BotonAcc>
      );
    }
    return "";
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser", {})}
      />
      <FloatBack onClick={() => props.goToView("tableListener", {})} />

      <h2 className="infoGeneral_details">
        Pedido n° {props.orderChoosen_index + 1}
      </h2>
      <div className="flexRowCenter">
        <div className="flexRowAround min480">
          <BotonAcc onClick={deleteOrderButton}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaTrash />
            </IconContext.Provider>
          </BotonAcc>

          {chargeReLoadButton()}
          {chargeEditOrderButton()}
        </div>
      </div>

      <div className="flexRowCenter">total: {currentOrderAsked.total}</div>
      {renderDeepList()}

      <Footer />
    </div>
  );
}

export default EditOrDeleteOrder;
