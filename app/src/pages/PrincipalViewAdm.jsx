import React from "react";
import { IconContext } from "react-icons";
import {
    FaPlus
} from "react-icons/fa";
import SideBoardFloat from "./views/components/SideBoardFloat";
import NavBurguer from "./views/components/NavBurguer";
import Footer from "./views/components/Footer";
import BotonAcc from "./views/components/BotonAcc";
import List from "./views/components/List";

function PrincipalViewAdm(props) {
    return <div className="pageDivApp">
        <SideBoardFloat />
        <NavBurguer
            opciones={[
                "Productos",
                "Trabajadores",
                "Mesas"
            ]}
            content={[
                <div>
                    <List
                        list={props.productos.map(pr => pr.name)}
                        onClick={data => {
                            let producto = props.productos.find(pr => pr.name == data);
                            props.goToView("oneItemAdm", producto);
                        }}
                    />
                    <div className="flexRowCenter">
                        <BotonAcc onClick={() => {
                            props.goToView("addProductAdm", {});
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                </div>,
                <div>
                    <List
                        list={props.workers.map(wr => wr.name)}
                        onClick={data => {
                            let worker = props.workers.find(wr => wr.name == data);
                            props.goToView("oneWorkerAdm", worker);
                        }}
                    />
                    <div className="flexRowCenter">
                        <BotonAcc onClick={() => {
                            props.goToView("addWorkerAdm", {});
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                </div>,
                <div>
                    <List
                        list={props.tables.map(tb => tb.number)}
                        onClick={data => {
                            let table = props.tables.find(tb => tb.number == data);
                            props.goToView("oneTableAdm", table);
                        }}
                    />
                    <div className="flexRowCenter">
                        <BotonAcc onClick={() => {
                            props.goToView("addTableAdm", {});
                        }}>
                            <IconContext.Provider value={{ size: "0.7em" }}>
                                <FaPlus />
                            </IconContext.Provider>
                        </BotonAcc>
                    </div>
                </div>
            ]}
        />
        <Footer />
    </div>
}

export default PrincipalViewAdm;