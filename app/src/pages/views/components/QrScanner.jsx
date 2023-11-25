import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaFlipboard
} from "react-icons/fa";
import { QrReader } from "react-qr-reader";
import { useAlert } from "react-alert";
import BotonAcc from "./BotonAcc";

function QrScanner({ getResult }) {
    let alert = useAlert();
    let [typeOfCamera, SetTypeOfCamera] = useState("user");

    return <div>
        <QrReader
            onResult={(result, e) => {
                let comparar = "";
                if (e) comparar = e.name;
                if (comparar != "NotAllowedError") {
                    if (result) if (result.text) getResult(result.text);
                } else alert.show("Debes dar permiso a la cámara")
            }}
            constraints={{ facingMode: typeOfCamera }}
        />
        <div className="flexRowCenter">
            <BotonAcc onClick={() => {
                if (typeOfCamera == "user") SetTypeOfCamera("environment");
                else SetTypeOfCamera("user");
            } } >
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaFlipboard />
                </IconContext.Provider>
            </BotonAcc>
        </div>
    </div>
}

export default QrScanner;