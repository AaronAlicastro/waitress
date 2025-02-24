import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaPlus, FaTimes } from "react-icons/fa";
import { useAlert } from "react-alert";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import BotonAcc from "./components/BotonAcc";

function AddProductAdm(props) {
  const alert = useAlert();
  const error = "Error, comprueba la conexión a internet";
  const productWorked = props.product || {};
  const [ingres, setIngres] = useState(props.ingres || []);

  const addIngre = (e) => {
    e.preventDefault();
    const [inputName, inputPrice] = document.querySelectorAll("INPUT");
    productWorked.name = inputName.value;
    productWorked.price = inputPrice.value;

    props.goToView("ingreToProduct", {
      ingres,
      product: productWorked,
      invertView: props.invertView,
    });
  };
  const deleteIngre = (index) => {
    setIngres(ingres.filter((_, i) => i !== index));
  };

  const chargeIgreList = () => {
    return ingres.map((ing_X, i) => {
      return {
        type: "no-input",
        data: (
          <div
            className="flexRowCenter labelToRemoveContainer"
            key={new Date() + "ingres" + i}
          >
            <input type="text" value={ing_X.name} disabled />

            <span className="closer" onClick={() => deleteIngre(i)}>
              <IconContext.Provider value={{ size: "0.3em" }}>
                <FaTimes />
              </IconContext.Provider>
            </span>
          </div>
        ),
      };
    });
  };
  const chargeIngreBtnPlus = () => {
    return {
      type: "no-input",
      data: (
        <div className="flexRowCenter" key={new Date() + "addIngres"}>
          <BotonAcc onClick={addIngre}>
            <IconContext.Provider value={{ size: "0.7em" }}>
              <FaPlus />
            </IconContext.Provider>
          </BotonAcc>
        </div>
      ),
    };
  };

  const createOrEdit = (entrences) => {
    props.goToView(false, null, (fun) => {
      const handleError = (somethingWrong) => {
        if (somethingWrong) alert.show(error);
        fun("principalViewAdm", 0);
      };
      entrences.ingre = ingres;

      if (props.invertView) {
        entrences._id = productWorked._id;
        props.querys.editProduct(entrences, handleError);
      } else props.querys.createProduct(entrences, handleError);
    });
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack onClick={() => props.goToView("principalViewAdm", 0)} />

      <Forms
        id="form_editProductAdm_form_createProductAdm"
        title={props.invertView ? "Editar producto" : "Crear producto"}
        campos={[
          {
            leyenda: "name",
            placeholder: "Nombre",
            value: productWorked.name,
          },
          {
            leyenda: "price",
            placeholder: "Valor",
            type: "Number",
            value: productWorked.price,
          },
          ...chargeIgreList(),
          chargeIngreBtnPlus(),
        ]}
        btn_text={props.invertView ? "Editar" : "Registrar"}
        onClick={createOrEdit}
      />

      <Footer />
    </div>
  );
}

export default AddProductAdm;
