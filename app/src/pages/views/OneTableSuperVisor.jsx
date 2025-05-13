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

const sliderArrivedId = "oneTableSuperVisor_slider";

function OneTableSuperVisor(props) {
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

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <LeftSliderWindow id={sliderArrivedId}>
        <h1>Llegadas</h1>
        <button onClick={closeOrdersArrived}>Cerrar</button>
      </LeftSliderWindow>

      <FloatBack onClick={() => props.goToView("principalViewSupervisor")} />
      <LeftFloatButtonAcc onClick={openOrdersArrived} />

      <h1 className="flexRowCenter infoGeneral_details">
        Mesa {props.querys.tableChoosen.number} ~ {setCustomerName()}
      </h1>

      <List
        list={props.querys.orders.map((_, i) => "Pedido " + (i + 1))}
        onClick={checkOrder}
      />

      <Footer />
    </div>
  );
}

export default OneTableSuperVisor;
