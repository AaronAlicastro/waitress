import React from "react";
import logo from "./images/logo.png";
import "./styles/footer.css";

function Footer() {
    return <footer>
        <span>Aaron Alicastro</span>
        <div>
            <img src={logo} alt="logo" />
        </div>
    </footer>
}

export default Footer;