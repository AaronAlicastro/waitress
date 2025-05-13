import React from "react";
import { IconContext } from "react-icons";
import { FaCheck, FaPlus } from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";

function TableListener(props) {
  const total = props.querys.orders.reduce(
    (accumulator, orden) => accumulator + orden.total,
    0
  );

  const addOrderButton = () => {
    props.querys.orderChoosen = {
      manager: props.querys.user.manager,
      table: props.querys.tableChoosen._id,
      tableNumber: props.querys.tableChoosen.number,
      productsAsked: props.productsAsked || [],
      total: props.total || 0,
    };

    props.goToView("addProductToTable");
  };

  const renderCheckButton = () => {
    if (total) {
      return (
        <BotonAcc onClick={() => props.goToView("finalCheck")}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaCheck />
          </IconContext.Provider>
        </BotonAcc>
      );
    }
    return "";
  };

  const editOrDeleteOrder = (index) => {
    props.querys.orderChoosen = props.querys.orders[index];

    props.goToView("editOrDeleteOrder", {
      orderIndex_x: index,
    });
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack onClick={() => props.goToView("principalViewWorker")} />

      <h2 className="infoGeneral_tilte">
        MS - {props.querys.tableChoosen.number}
      </h2>
      <div className="flexRowCenter">
        <div className="flexRowBetween min300">
          {renderCheckButton()}

          <BotonAcc onClick={addOrderButton}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaPlus />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      </div>
      <div className="flexRowCenter">${total.toLocaleString()}</div>

      <List
        list={props.querys.orders.map((_, i) => "Pedido " + (i + 1))}
        onClick={editOrDeleteOrder}
      />
      <Footer />
    </div>
  );
}

export default TableListener;
