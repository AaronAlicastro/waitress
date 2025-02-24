import React from "react";
import { IconContext } from "react-icons";
import { FaPen, FaTrash } from "react-icons/fa";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";
import QrMaker from "./components/QrMaker";
import SideBoardFloat from "./components/SideBoardFloat";
import BotonAcc from "./components/BotonAcc";
import IngreCards from "./components/IngreCards";

function OneItemAdm(props) {
  const addProductAdm = () => {
    props.goToView("addProductAdm", {
      invertView: true,
      ingres: props.product.ingre,
      product: props.product,
    });
  };

  const deleteProduct = () => {
    const pre = window.confirm("¿Desea eliminar este producto?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        const data = { _id: props.product._id };

        props.querys.deleteProduct(data, (somethingWrog) => {
          if (somethingWrog) {
            alert.show("Algo ha salido mal, comprueba la conexión a internet");
            fun(false, props.product);
          } else fun("principalViewAdm", 0);
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
      <FloatBack onClick={() => props.goToView("principalViewAdm", 0)} />

      <div className="flexRowCenter">
        <div className="flexRowBetween min300">
          <BotonAcc onClick={addProductAdm}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaPen />
            </IconContext.Provider>
          </BotonAcc>

          <BotonAcc onClick={deleteProduct}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaTrash />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      </div>

      <div className="flexColumnStart">
        <h3> {props.product.name} </h3>
        <h4> ${props.product.price.toLocaleString()} </h4>
      </div>

      <span className="infoGeneral_details">Ingredientes:</span>
      <IngreCards ingrex={props.product.ingre} />

      <QrMaker value={props.product._id} />
      <div className="flexRowCenter">
        <span> {props.product._id} </span>
      </div>

      <Footer />
    </div>
  );
}

export default OneItemAdm;
