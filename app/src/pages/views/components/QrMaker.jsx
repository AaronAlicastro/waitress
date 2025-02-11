import React from "react";
import QRCode from "react-qr-code";

function QrMaker({ value }) {
  return (
    <div
      className="QrContainer"
      style={{
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QRCode value={value} size={256} level={"H"} />
    </div>
  );
}

export default QrMaker;
