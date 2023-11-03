import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaFlipboard
} from "react-icons/fa";
import { QrReader } from "react-qr-reader";
import { useAlert } from "react-alert";
import BotonAcc from "./BotonAcc";

function QrScanner(props) {
    let alert = useAlert();
    let [typeOfCamera, SetTypeOfCamera] = useState("user");

    return <div>
        <QrReader
            onResult={(result, e) => {
                if (e.name != "NotAllowedError") {
                    if (result) if (result.text) {
                        console.log(result);
                    }
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