import React, { useState } from "react";
import "./styles/ordersArrivedWaitress.css";
import { setOrderStatusStyle } from "../../../logic/generalFunctions";

const eventModuleID_ordersArrived = "ordersArrivedWaitress";

function OrdersArrivedWaitress(props) {
  const [orderList, setOrderList] = useState([]);
  const validStatus = (status) => {
    return status === "terminado";
  };

  props.querys.workersListening.setEventModule(
    eventModuleID_ordersArrived,
    (orderList) => {
      const newOrderList = [];

      orderList.forEach((order) => {
        order.productsAsked.forEach((product) => {
          if (validStatus(product.status)) {
            newOrderList.push({
              ...product,
              tableNumber: order.tableNumber,
              onClick: () => {
                props.goToView(false, null, (fun) => {
                  props.querys.getOneTable(order.table, () => {
                    const index = props.querys.orders.findIndex(
                      (ors) => ors._id === order._id
                    );

                    props.querys.orderChoosen = order;

                    fun("editOrDeleteOrder", {
                      orderIndex_x: index,
                    });
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
    <div className="ordersFinished_container">
      {orderList.map((order, i) => {
        return (
          <p onClick={order.onClick} key={"ordersFinished" + i}>
            <span style={setOrderStatusStyle(order.status)}>
              {order.status}
            </span>
            MS {order.tableNumber} <br /> <br />
            {order.productCount} {order.product}
          </p>
        );
      })}
    </div>
  );
}

export default OrdersArrivedWaitress;
