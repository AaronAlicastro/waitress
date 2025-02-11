import React, { useState } from "react";
import { IconContext } from "react-icons";
import { FaFlipboard } from "react-icons/fa";
import { QrReader } from "react-qr-reader";
import { useAlert } from "react-alert";
import BotonAcc from "./BotonAcc";

function QrScanner({ getResult }) {
  const alert = useAlert();
  const [typeOfCamera, SetTypeOfCamera] = useState("user");

  const changeCamera = () => {
    SetTypeOfCamera(typeOfCamera === "user" ? "environment" : "user");
  };

  const scan = (result, e) => {
    if (e.name !== "NotAllowedError") {
      if (result) if (result.text) getResult(result.text);
    } else alert.show("Debes dar permiso a la cámara");
  };

  return (
    <div>
      <QrReader onResult={scan} constraints={{ facingMode: typeOfCamera }} />
      <div className="flexRowCenter">
        <BotonAcc onClick={changeCamera}>
          <IconContext.Provider value={{ size: "0.7em" }}>
            <FaFlipboard />
          </IconContext.Provider>
        </BotonAcc>
      </div>
    </div>
  );
}

export default QrScanner;
