import React from "react";
import "./components/styles/showInfoGeneral.css";
import { IconContext } from "react-icons";
import { FaCheck, FaPlus } from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";

function TableListener(props) {
  let total = 0;
  props.querys.orders.forEach((or) => {
    total += or.total;
  });

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

  const addOrderButton = () => {
    props.goToView("addProductToTable", {
      tableChoosen: props.querys.tableChoosen,
      products: props.querys.products,
    });
  };

  const editOrDeleteOrder = (ls) => {
    const index = parseInt(ls.replace("Pedido ", "")) - 1;

    props.goToView("editOrDeleteOrder", {
      orderChoosen: props.querys.orders[index],
      orderChoosen_index: index,
    });
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser", {})}
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
      <div className="flexRowCenter">Total: {total}</div>

      <List
        list={props.querys.orders.map((or, i) => "Pedido " + (i + 1))}
        onClick={editOrDeleteOrder}
      />
      <Footer />
    </div>
  );
}

export default TableListener;
