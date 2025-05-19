import React from "react";
import { QrReader } from "react-qr-reader";
import { useAlert } from "react-alert";

function QrScanner({ getResult }) {
  const alert = useAlert();

  const scan = (result, e = { name: "scan" }) => {
    if (e.name !== "NotAllowedError") {
      if (result) if (result.text) getResult(result.text);
    } else alert.show("Debes dar permiso a la cámara");
  };

  return (
    <QrReader
      onResult={scan}
      constraints={{ facingMode: "environment" }}
      scanDelay={1500}
    />
  );
}

export default QrScanner;
