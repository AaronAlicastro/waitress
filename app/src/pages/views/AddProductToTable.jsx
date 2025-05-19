import React from "react";
import { IconContext } from "react-icons";
import { FaCheck } from "react-icons/fa";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import BotonAcc from "./components/BotonAcc";
import { useAlert } from "react-alert";
import OrderCards from "./components/OrderCards";
import ProductListFilter from "./components/ProductListFilter";

function AddProductToTable(props) {
  const alert = useAlert();

  const billcounter = (index) => {
    props.querys.productChoosen = props.querys.products[index];
    props.goToView("billcounter");
  };

  const finishOrder = () => {
    if (props.querys.orderChoosen.productsAsked.length) {
      const pre = window.confirm("¿Confirma el pedido?");

      if (pre) {
        props.goToView(false, null, (fun) => {
          props.querys.createOrder(
            props.querys.orderChoosen,
            (somethingWrong) => {
              if (somethingWrong) alert.show("Error, comprueba tu internet");
              else {
                props.querys.productChoosen = null;
                props.querys.orderChoosen = null;
                alert.show("¡Arriba pedido!");
              }

              fun("tableListener");
            }
          );
        });
      }
    } else alert.show("Primero, selecciona un producto a la orden");
  };

  const deleteProduct = (pr, index) => {
    const pre = confirm("¿Eliminarlo?");
    if (pre) {
      props.querys.orderChoosen.productsAsked.splice(index, 1);
      props.querys.orderChoosen.total -= pr.totalProduct;

      props.goToView(false, null, (fun) => fun());
    }
  };

  const scanProduct = (id_result) => {
    props.querys.productChoosen = props.querys.products.find(
      (pr) => pr._id === id_result
    );
    props.goToView("billcounter");
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
        <span>${props.querys.orderChoosen.total.toLocaleString()}</span>
      </div>

      <h2 className="infoGeneral_details">Añade Producto | finaliza</h2>
      <ProductListFilter
        products={props.querys.products}
        chargeQR={true}
        QRfunction={() => props.goToView("qr_window", scanProduct)}
        productClick={billcounter}
      />

      <OrderCards
        productsAsked={props.querys.orderChoosen.productsAsked}
        clickOnClose={deleteProduct}
      />

      <Footer />
    </div>
  );
}

export default AddProductToTable;
