import React, { useState } from "react";
import "./styles/ordersArrivedSupervisor.css";
import { setOrderStatusStyle } from "../../../logic/generalFunctions";

const eventModuleID_ordersArrived = "ordersArrivedSupervisor";

function OrdersArrivedSupervisor(props) {
  const [orderList, setOrderList] = useState([]);

  props.querys.workersListening.setEventModule(
    eventModuleID_ordersArrived,
    (orderList) => {
      const newOrderList = [];

      orderList.forEach((order) => {
        order.productsAsked.forEach((product) => {
          if (
            product.status === "pendiente" ||
            product.status === "preparando"
          ) {
            newOrderList.push({
              ...product,
              tableNumber: order.tableNumber,
              onClick: () => {
                props.goToView(false, null, (fun) => {
                  props.querys.getOneTableBySupervisor(order.table, () => {
                    props.querys.orderChoosen = order;
                    fun("oneOrderSupervisor");
                  });
                });
              },
            });
          }
        });
      });

      setOrderList(newOrderList);
    }
  );

  return (
    <div className="ordersArrived_container">
      <h1 className="infoGeneral_details">Ordenes en lista</h1>

      {orderList.map((order, i) => {
        return (
          <p onClick={order.onClick} key={"ordersArrived" + i}>
            <span style={setOrderStatusStyle(order.status)}>
              {order.status}
            </span>
            MS {order.tableNumber} <br /> <br />
            {order.productCount} {order.product}
          </p>
        );
      })}

      <button className="general_btn" onClick={props.closeOrdersArrived}>
        cerrar
      </button>
    </div>
  );
}

export default OrdersArrivedSupervisor;
