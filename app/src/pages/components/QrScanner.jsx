import React from "react";
import { QrReader } from "react-qr-reader";
import { useAlert } from "react-alert";

function QrScanner(props) {
  let alert = useAlert();

    return <QrReader
        onResult={(result, e) => {
            if (e.name != "NotAllowedError") {
                if (result) if (result.text) {
                    console.log(result);
                }
            } else alert.show("Debes dar permiso a la cámara")
        }}
        constraints={props.constraints}
    />
}

export default QrScanner;