import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaUndoAlt, FaCheck, FaTrash } from "react-icons/fa";
import Footer from "./components/Footer";
import BotonAcc from "./components/BotonAcc";
import FloatBack from "./components/FloatBack";
import SideBoardFloat from "./components/SideBoardFloat";
import { useAlert } from "react-alert";
import OrderCards from "./components/OrderCards";
import { createOrderCopy } from "../../logic/generalFunctions";
import {
  closeLeftSliderWindow,
  LeftSliderWindow,
  openLeftSliderWindow,
} from "./components/LeftSliderWindow";

const sliderOrderStatusId = "editOrDeleteOrder_slider_orderStatus";

function EditOrDeleteOrder(props) {
  const [prAsk_index, setPrAsk_index] = useState(0);
  const alert = useAlert();

  const currentOrder = props.orderCopy_x
    ? props.orderCopy_x
    : createOrderCopy(props.querys.orderChoosen);

  const reLoadPage = (base = false) => {
    props.goToView(false, null, (fun) => {
      fun("editOrDeleteOrder", {
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

  const openOrdersStatus = (index) => {
    setPrAsk_index(index);
    openLeftSliderWindow(sliderOrderStatusId);
  };
  const closeOrdersStatus = () => closeLeftSliderWindow(sliderOrderStatusId);

  const renderDeepList = () => {
    if (currentOrder.productsAsked.length) {
      return (
        <OrderCards
          productsAsked={currentOrder.productsAsked}
          clickOnClose={(pr, index) => quitProducFromList(pr, index)}
          clickOnStatus={(_, index) => openOrdersStatus(index)}
        />
      );
    }

    return "";
  };

  const deleteOrderButton = () => {
    const pre = window.confirm("¿Desea eliminarlo?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        const [orderDeleted] = props.querys.orders.splice(
          props.orderIndex_x,
          1
        );
        console.log(orderDeleted);

        const data = { _id: orderDeleted._id };

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
        props.querys.orderChoosen.productsAsked.length
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
      props.querys.orderChoosen.productsAsked.length
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

  const markOrderAsDelivered = () => {
    const _id = props.querys.orderChoosen.productsAsked[prAsk_index]._id;
    const status = "entregado";

    const orderIndex = props.querys.orders.findIndex((order) =>
      order.productsAsked.find((product) => product._id === _id)
    );

    props.querys.orders[orderIndex].productsAsked[prAsk_index].status = status;
    props.querys.orderChoosen.productsAsked[prAsk_index].status = status;

    props.goToView(false, null, (fun) => {
      props.querys.editOneProductAsked_status(
        {
          _id,
          status,
        },
        () => fun()
      );
    });
  };

  const chargeSliderStatusContent = () => {
    const status = props.querys.orderChoosen.productsAsked[prAsk_index].status;

    if (status === "terminado") {
      return (
        <div className="flexColumnStart flexAllGap">
          <br />
          <br />

          <h1 className="infoGeneral_details">Marcar como:</h1>
          <label onClick={markOrderAsDelivered} className="whiteBoxShadow">
            entregado
          </label>

          <button onClick={closeOrdersStatus} className="general_btn">
            cerrar
          </button>
        </div>
      );
    }

    return (
      <div className="flexColumnStart flexAllGap">
        <br />
        <br />

        <button onClick={closeOrdersStatus} className="general_btn">
          cerrar
        </button>

        <p style={{ fontSize: "var(--font_small)", textAlign: "center" }}>
          El pedido no está terminado, regresa para marcarlo como entregado en
          cuanto este terminado y lo hayas entregado
        </p>
      </div>
    );
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <FloatBack onClick={() => props.goToView("tableListener")} />

      <LeftSliderWindow id={sliderOrderStatusId}>
        <div className="flexRowCenter flexWhitoutPadding">
          {chargeSliderStatusContent()}
        </div>
      </LeftSliderWindow>

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
        ${currentOrder.total.toLocaleString()}
      </div>
      {renderDeepList()}

      <Footer />
    </div>
  );
}

export default EditOrDeleteOrder;
