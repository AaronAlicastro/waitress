import React from "react";
import SideBoardFloat from "./views/components/SideBoardFloat";
import Footer from "./views/components/Footer";
import BigBoton from "./views/components/BigBoton";
import OrdersArrivedWaitress from "./views/components/OrdersArrivedWaitress";

function PrincipalViewWorker(props) {
  const scanTable = (id_result) => {
    props.goToView(false, null, (fun) => {
      props.querys.getOneTable(id_result, (somethingWrong) => {
        if (somethingWrong) fun();
        else fun("tableListener");
      });
    });
  };

  const changeToScan = () => {
    props.goToView("qr_window", scanTable);
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />

      <div className="flexRowCenter">
        <BigBoton onClick={changeToScan}>Atender mesa</BigBoton>
      </div>

      <OrdersArrivedWaitress querys={props.querys} goToView={props.goToView} />
      <Footer />
    </div>
  );
}

export default PrincipalViewWorker;
