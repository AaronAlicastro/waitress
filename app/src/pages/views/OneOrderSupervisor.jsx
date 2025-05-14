import React, { useState } from "react";
import SideBoardFloat from "./components/SideBoardFloat";
import {
  closeLeftSliderWindow,
  LeftSliderWindow,
  openLeftSliderWindow,
} from "./components/LeftSliderWindow";
import FloatBack from "./components/FloatBack";
import LeftFloatButtonAcc from "./components/LeftFloatButtonAcc";
import Footer from "./components/Footer";
import OrderCards from "./components/OrderCards";
import OrdersArrivedSupervisor from "./components/OrdersArrivedSupervisor";

const sliderArrivedId = "oneOrderSupervisor_slider";
const sliderOrderStatusId = "oneOrderSupervisor_slider_orderStatus";
const sliderwithoutListId = "oneOrderSupervisor_slider_withoutList";

function OneOrderSupervisor(props) {
  const [currentWithoutList, setCurrentWithoutList] = useState([]);
  const [closeOrdersStauts, setCloseOrdersStauts] = useState(() => {});

  const orderIndex = props.querys.orders.findIndex((or) => {
    return props.querys.orderChoosen._id === or._id;
  });

  const openOrdersArrived = () => openLeftSliderWindow(sliderArrivedId);
  const closeOrdersArrived = () => closeLeftSliderWindow(sliderArrivedId);

  const openOrdersStauts = (thisProductAsked, index) => {
    setCloseOrdersStauts(() => (e) => {
      if (e.target.innerHTML !== "cerrar") {
        props.querys.orderChoosen.productsAsked[index] = {
          ...thisProductAsked,
          status: e.target.innerHTML,
        };

        props.goToView(false, null, (fun) => {
          props.querys.editOneProductAsked_status(
            {
              _id: thisProductAsked._id,
              status: e.target.innerHTML,
            },
            () => fun()
          );
        });
      } else closeLeftSliderWindow(sliderOrderStatusId);
    });

    openLeftSliderWindow(sliderOrderStatusId);
  };

  const closeOrderWithout = () => {
    setCurrentWithoutList([]);
    closeLeftSliderWindow(sliderwithoutListId);
  };
  const openOrderWithout = (productName, without) => {
    setCurrentWithoutList([
      productName,
      ...without.map((item) => ({
        onClick: closeOrderWithout,
        text: item,
      })),
      {
        onClick: closeOrderWithout,
        className: "general_btn",
        text: "Cerrar",
      },
    ]);
    openLeftSliderWindow(sliderwithoutListId);
  };

  const statusBoxList = [
    {
      onClick: closeOrdersStauts,
      text: "pendiente",
    },
    {
      onClick: closeOrdersStauts,
      text: "preparando",
    },
    {
      onClick: closeOrdersStauts,
      text: "terminado",
    },
    {
      onClick: closeOrdersStauts,
      className: "general_btn",
      text: "cerrar",
    },
  ];

  const renderBoxWhiteShadows = (array) => {
    return array.map((box, i) => {
      return (
        <label
          key={box.text + i}
          onClick={box.onClick}
          className={box.className ? box.className : "whiteBoxShadow"}
        >
          {box.text}
        </label>
      );
    });
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <FloatBack onClick={() => props.goToView("oneTableSuperVisor")} />
      <LeftFloatButtonAcc onClick={openOrdersArrived} />

      <LeftSliderWindow id={sliderArrivedId}>
        <OrdersArrivedSupervisor
          querys={props.querys}
          goToView={props.goToView}
          closeOrdersArrived={closeOrdersArrived}
        />
      </LeftSliderWindow>

      <LeftSliderWindow id={sliderOrderStatusId}>
        <div className="flexRowCenter flexWhitoutPadding">
          <div className="flexColumnStart flexAllGap">
            <h1 className="infoGeneral_details">Marcar como:</h1>
            {renderBoxWhiteShadows(statusBoxList)}
          </div>
        </div>
      </LeftSliderWindow>

      <LeftSliderWindow id={sliderwithoutListId}>
        <div className="flexRowCenter flexWhitoutPadding">
          <div className="flexColumnStart flexAllGap">
            <h1 className="infoGeneral_details">
              {currentWithoutList.shift()} [sin]:
            </h1>
            {renderBoxWhiteShadows(currentWithoutList)}
          </div>
        </div>
      </LeftSliderWindow>

      <h1 className="flexRowCenter infoGeneral_details">
        Mesa {props.querys.tableChoosen.number} ~ Pedido n° {orderIndex + 1}
      </h1>

      <OrderCards
        isWaitress={false}
        productsAsked={props.querys.orderChoosen.productsAsked}
        clickOnStatus={openOrdersStauts}
        clickOnWithout={openOrderWithout}
      />

      <Footer />
    </div>
  );
}

export default OneOrderSupervisor;
