import React, { useState } from "react";
import SideBoardFloat from "./views/components/SideBoardFloat";
import Footer from "./views/components/Footer";
import BigBoton from "./views/components/BigBoton";
import QrScanner from "./views/components/QrScanner";
import FloatBack from "./views/components/FloatBack";

function PrincipalViewWorker(props) {
  const [view, setView] = useState("principal");
  const putBackArrow = () => {
    if (view === "QRscanner") {
      return <FloatBack onClick={() => setView("principal")} />;
    }
    return "";
  };

  const scanTable = (result) => {
    if (view === "QRscanner") {
      props.goToView(false, {}, (fun) => {
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
          {scanTable("654eb66ddbd49c3ce10346dd")}
        </div>
      </div>
    ),
  };

  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser", {})}
      />

      {putBackArrow()}
      {viewToShow[view]}
      <Footer />
    </div>
  );
}

export default PrincipalViewWorker;
