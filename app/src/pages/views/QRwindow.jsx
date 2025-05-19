import React from "react";
import QrScanner from "./components/QrScanner";
import SideBoardFloat from "./components/SideBoardFloat";
import FloatBack from "./components/FloatBack";
import Footer from "./components/Footer";

function QRwindow(props) {
  return (
    <div className="pageDivApp">
      <SideBoardFloat
        userName={props.querys.user.name}
        userId={props.querys.user._id}
        editUser={() => props.goToView("editUser")}
      />
      <FloatBack
        onClick={() => {
          props.goToView(props.lastView.view, props.lastView.dataView);
        }}
      />

      <div className="flexRowCenter">
        <div style={{ minWidth: "300px", minHeight: "450px" }}>
          <QrScanner getResult={props.qr_function} />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default QRwindow;
