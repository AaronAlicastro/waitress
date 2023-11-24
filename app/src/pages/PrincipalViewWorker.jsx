import React, { useState } from "react";
import SideBoardFloat from "./views/components/SideBoardFloat";
import Footer from "./views/components/Footer";
import BigBoton from "./views/components/BigBoton";
import QrScanner from "./views/components/QrScanner";
import FloatBack from "./views/components/FloatBack";

function PrincipalViewWorker(props) {
    let [view, setView] = useState("beginning");
    let viewToShow = {
        "beginning": <div className="flexRowCenter">
            <BigBoton
                // onClick={() => setView("QRscanner")}
                onClick={() => props.goToView("tableListener", {})}
            >Atender mesa</BigBoton>
        </div>,
        "QRscanner": <div className="flexRowCenter">
            <div style={{ minWidth: "300px", minHeight: "450px" }}>
                <QrScanner />
            </div>
        </div>
    }

    return <div className="pageDivApp">
        <SideBoardFloat
            userName={props.querys.user.name}
            userId={props.querys.user._id}
        />
        {(view == "QRscanner") ? <FloatBack onClick={() => setView("beginning")} /> : ""}
        {viewToShow[view]}
        <Footer />
    </div>
}

export default PrincipalViewWorker;