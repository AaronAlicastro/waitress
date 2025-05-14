import React from "react";
import SideBoardFloat from "./components/SideBoardFloat";
import {
  closeLeftSliderWindow,
  LeftSliderWindow,
  openLeftSliderWindow,
} from "./components/LeftSliderWindow";
import FloatBack from "./components/FloatBack";
import List from "./components/List";
import LeftFloatButtonAcc from "./components/LeftFloatButtonAcc";
import Footer from "./components/Footer";
import OrdersArrivedSupervisor from "./components/OrdersArrivedSupervisor";

const sliderArrivedId = "oneTableSuperVisor_slider";

function OneTableSuperVisor(props) {
  const itemListStyle = [];

  // creating item styles
  const listNames = props.querys.orders.map((order, i) => {
    const name = "Pedido " + (i + 1);

    const isNotComplete = order.productsAsked.find((product) => {
      return product.status === "pendiente" || product.status === "preparando";
    });

    if (!isNotComplete) itemListStyle[name] = { background: "var(--back)" };

    return name;
  });

  const openOrdersArrived = () => openLeftSliderWindow(sliderArrivedId);
  const closeOrdersArrived = () => closeLeftSliderWindow(sliderArrivedId);

  const setCustomerName = () => {
    if (props.querys.tableChoosen.customerName) {
      return props.querys.tableChoosen.customerName;
    }

    return "Libre";
  };

  const checkOrder = (index) => {
    props.querys.orderChoosen = props.querys.orders[index];
    props.goToView("oneOrderSupervisor");
  };

  const chargeCheckOut = () => {
    if (listNames.length) {
      return (
        <div className="flexRowCenter">
          <button className="general_btn">cerrar cuenta</button>
        </div>
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

      <LeftSliderWindow id={sliderArrivedId}>
        <OrdersArrivedSupervisor
          querys={props.querys}
          goToView={props.goToView}
          closeOrdersArrived={closeOrdersArrived}
        />
      </LeftSliderWindow>

      <FloatBack onClick={() => props.goToView("principalViewSupervisor")} />
      <LeftFloatButtonAcc onClick={openOrdersArrived} />

      <h1 className="flexRowCenter infoGeneral_details">
        Mesa {props.querys.tableChoosen.number} ~ {setCustomerName()}
      </h1>

      <List itemStyles={itemListStyle} list={listNames} onClick={checkOrder} />
      {chargeCheckOut()}

      <Footer />
    </div>
  );
}

export default OneTableSuperVisor;
