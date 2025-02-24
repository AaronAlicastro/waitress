import React from "react";
import { IconContext } from "react-icons";
import { FaUndoAlt, FaCheck, FaTrash } from "react-icons/fa";
import Footer from "./components/Footer";
import BotonAcc from "./components/BotonAcc";
import FloatBack from "./components/FloatBack";
import SideBoardFloat from "./components/SideBoardFloat";
import { useAlert } from "react-alert";
import OrderCards from "./components/OrderCards";
import { createOrderCopy } from "../../logic/generalFunctions";

function EditOrDeleteOrder(props) {
  const alert = useAlert();
  const currentOrder = props.orderCopy_x
    ? props.orderCopy_x
    : createOrderCopy(props.orderChoosen);

  const reLoadPage = (base = false) => {
    props.goToView(false, null, (fun) => {
      fun("editOrDeleteOrder", {
        orderChoosen: props.orderChoosen,
        orderCopy_x: base ? null : currentOrder,
        orderIndex_x: props.orderIndex_x,
      });
    });
  };

  const quitProducFromList = (pr, index) => {
    currentOrder.total -= pr.totalProduct;
    currentOrder.productsAsked.splice(index, 1);
    reLoadPage();
  };

  const renderDeepList = () => {
    if (currentOrder.productsAsked.length) {
      return (
        <OrderCards
          productsAsked={currentOrder.productsAsked}
          onClick={(pr, index) => quitProducFromList(pr, index)}
        />
      );
    }

    return "";
  };

  const deleteOrderButton = () => {
    const pre = window.confirm("¿Desea eliminarlo?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        props.querys.orders.splice(props.orderIndex_x, 1);
        const data = { _id: props.orderIndex_x._id };

        props.querys.deleteOrder(data, (somethingWrong) => {
          if (somethingWrong) alert.show("Algo salio mal, revisa el internet");
          else alert.show("Eliminado con éxito");

          fun("tableListener");
        });
      });
    }
  };
  const editOrderButton = () => {
    const pre = window.confirm("¿Desea editarlo?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        props.querys.editOrder(currentOrder, (somethingWrong) => {
          if (somethingWrong) alert.show("Algo salio mal, revisa el internet");
          else {
            props.querys.orders[props.orderIndex_x].productsAsked =
              currentOrder.productsAsked;
            props.querys.orders[props.orderIndex_x].total = currentOrder.total;

            alert.show("Editado con éxito");
          }

          fun("tableListener");
        });
      });
    }
  };

  const chargeEditOrderButton = () => {
    if (
      currentOrder.productsAsked.length &&
      currentOrder.productsAsked.length <
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
      currentOrder.productsAsked.length <
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
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack onClick={() => props.goToView("tableListener")} />

      <h2 className="infoGeneral_details">
        Pedido n° {props.orderIndex_x + 1}
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

      <div className="flexRowCenter">
        total: {currentOrder.total.toLocaleString()}
      </div>
      {renderDeepList()}

      <Footer />
    </div>
  );
}

export default EditOrDeleteOrder;
