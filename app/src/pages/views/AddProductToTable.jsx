import React from "react";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import List from "./components/List";
import BotonAcc from "./components/BotonAcc";
import { useAlert } from "react-alert";
import OrderCards from "./components/OrderCards";

function AddProductToTable(props) {
  const alert = useAlert();

  const billcounter = (ls) => {
    props.goToView("billcounter", {
      productChoosen: props.querys.products.find((pr) => pr.name === ls),
      productsAsked: props.productsAsked,
      total: props.total,
    });
  };

  const finishOrder = () => {
    if (props.productsAsked.length) {
      const pre = window.confirm("¿Confirma el pedido?");

      if (pre) {
        props.goToView(false, null, (fun) => {
          const data = {
            manager: props.querys.user.manager,
            table: props.querys.tableChoosen._id,
            tableNumber: props.querys.tableChoosen.number,
            productsAsked: props.productsAsked,
            total: props.total,
          };

          props.querys.createOrder(data, (somethingWrong) => {
            if (somethingWrong) alert.show("Error, comprueba tu internet");
            else alert.show("¡Arriba pedido!");

            fun("tableListener");
          });
        });
      }
    } else alert.show("Primero, selecciona un producto a la orden");
  };

  const deleteProduct = (pr, index) => {
    const pre = confirm("¿Eliminarlo?");
    if (pre) {
      props.productsAsked.splice(index, 1);

      props.goToView(false, null, (fun) => {
        fun("addProductToTable", {
          productsAsked: props.productsAsked,
          total: props.total - pr.totalProduct,
        });
      });
    }
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack
        onClick={() => {
          const pre = window.confirm("¿Desea cancelar el pedido?");
          if (pre) props.goToView("tableListener");
        }}
      />

      <div className="flexRowCenter flexAllGap flexNormalWrap">
        <BotonAcc onClick={finishOrder}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaCheck />
          </IconContext.Provider>
        </BotonAcc>
        <span>Total: {props.total.toLocaleString()}</span>
      </div>

      <h2 className="infoGeneral_tilte">Añade Producto | finaliza</h2>
      <List
        list={props.querys.products.map((pr) => pr.name)}
        onClick={billcounter}
      />

      <OrderCards productsAsked={props.productsAsked} onClick={deleteProduct} />

      <Footer />
    </div>
  );
}

export default AddProductToTable;
