import React from "react";
import SideBoardFloat from "./components/SideBoardFloat";
import Footer from "./components/Footer";
import FloatBack from "./components/FloatBack";
import Forms from "./components/Forms";
import { useAlert } from "react-alert";

function FinalCheck(props) {
  const alert = useAlert();
  const total = props.querys.orders.reduce(
    (accumulator, orden) => accumulator + orden.total,
    0
  );

  const clearOrder = () => {
    const pre = window.confirm("¿Cuenta nueva?");
    if (pre) {
      props.goToView(false, null, (fun) => {
        const data = {
          manager: props.querys.user.manager,
          table: props.querys.tableChoosen._id,
        };

        props.querys.deleteOrdersOfTable(data, (somethingWrong) => {
          if (somethingWrong) {
            alert.show("Algo ha salido mal, comprueba el internet");
          } else alert.show("Excelente, ¡sigue así!");

          fun("tableListener");
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
      <FloatBack onClick={() => props.goToView("tableListener")} />

      <Forms
        id="formFinalizarCheck"
        title={total}
        campos={[
          {
            leyenda: "total",
            type: "hidden",
            placeholder:
              "Cuenta de la mesa " + props.querys.tableChoosen.number,
            value: total,
          },
        ]}
        btn_text="Cerrar y cuenta nueva"
        onClick={clearOrder}
      />

      <Footer />
    </div>
  );
}

export default FinalCheck;
