import React, { useState } from "react";
import SideBoardFloat from "./views/components/SideBoardFloat";
import Footer from "./views/components/Footer";
import BigBoton from "./views/components/BigBoton";
import QrScanner from "./views/components/QrScanner";
import FloatBack from "./views/components/FloatBack";
import OrdersArrivedWaitress from "./views/components/OrdersArrivedWaitress";

function PrincipalViewWorker(props) {
  const [view, setView] = useState("principal");
  const chargeBackArrow = () => {
    if (view === "QRscanner") {
      return <FloatBack onClick={() => setView("principal")} />;
    }
    return "";
  };

  const scanTable = (result) => {
    if (view === "QRscanner") {
      props.goToView(false, null, (fun) => {
        props.querys.getOneTable(result, (somethingWrong) => {
          if (somethingWrong) fun();
          else fun("tableListener");
        });
      });
    }
    return "";
  };

  const viewToShow = {
    principal: (
      <div className="flexRowCenter">
        <BigBoton onClick={() => setView("QRscanner")}>Atender mesa</BigBoton>
      </div>
    ),
    QRscanner: (
      <div className="flexRowCenter">
        <div style={{ minWidth: "300px", minHeight: "450px" }}>
          {/* <QrScanner getResult={scanTable} /> */}
          {scanTable("68218a237ecd202eae8c9abe")}
        </div>
      </div>
    ),
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      {chargeBackArrow()}

      {viewToShow[view]}

      <OrdersArrivedWaitress
        querys={props.querys}
        goToView={props.goToView}
      />
      <Footer />
    </div>
  );
}

export default PrincipalViewWorker;
