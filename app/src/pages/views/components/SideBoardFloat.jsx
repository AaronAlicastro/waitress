import React, { useState } from "react";
import { IconContext } from "react-icons";
import {
    FaAngleDown,
    FaAngleUp
} from "react-icons/fa";
import "./styles/sideBoardFloat.css";
import Querys from "../../../logic/querys";
import Forms from "./Forms";
import { useAlert } from "react-alert";

function SideBoardFloat(props) {
    let [view, setView] = useState("principal");
    let alert = useAlert();
    let querys = new Querys();
    let interfaceShow = {
        principal: <div className="sideBoardFloat_container">
            <h1>Waitress</h1>
            <h4>{props.userName}</h4>
            <div>{props.userId}</div>
            <ul>
                <li className="account_events" onClick={() => {
                    // querys.deleteUser(props.userId);
                }}>Eliminar cuenta</li>

                <li className="account_events" onClick={() => setView("editUser")}>Editar cuenta</li>

                <li className="account_events" onClick={() => {
                    let pre = window.confirm("¿Desea cerrar sesión?");
                    if (pre) window.history.go(0);
                }}>Cerrar sesión</li>
            </ul>
        </div>,
        editUser: <div className="sideBoardFloat_container_only">
            <Forms
                id="form_edit_user"
                title="Editar datos"
                campos={[
                    {
                        leyenda: "name",
                        placeholder: "Nombre"
                    },
                    {
                        type: "email",
                        leyenda: "email",
                        placeholder: "Correo"
                    },
                    {
                        type: "password",
                        leyenda: "password1",
                        placeholder: "Contraseña"
                    },
                    {
                        type: "password",
                        leyenda: "password2",
                        placeholder: "Confirmar contraseña"
                    }
                ]}
                btn_text="Editar"
                onClick={(entrences) => {
                    if (entrences.password1 == entrences.password2) {
                        entrences.password = entrences.password1;
                        entrences._id = props.userId;
                        delete entrences.password1;
                        delete entrences.password2;
                        querys.editUser(entrences, (somthingWrong) => {
                            if (somthingWrong) alert.show("Ha ocurrido un error al intentar");
                            else {
                                window.alert("Editado con éxito. Ahora cerraremos sesión para actualizar datos");
                                window.history.go(0);
                            }
                        });
                    } else alert.show("Las contraseñas no son iguales");
                }}
                btn_second={<span className="btn--text" onClick={() => setView("principal")} > Cancelar </span>}
            />
        </div>
    };

    return <section className="sideBoardFloat">
        {interfaceShow[view]}

        <div className="sideBoardFloat_closer">
            <span className="closerSpan" onClick={e => {
                let sideBoardFloat = document.querySelector(".sideBoardFloat");
                let closerSpan = document.querySelectorAll(".closerSpan");
                sideBoardFloat.style.animation = "openSideBoard .8s forwards";
                closerSpan[0].style.display = "none";
                closerSpan[1].style.display = "flex";
            }}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaAngleDown />
                </IconContext.Provider>
            </span>
            <span className="closerSpan" onClick={e => {
                let sideBoardFloat = document.querySelector(".sideBoardFloat");
                let closerSpan = document.querySelectorAll(".closerSpan");
                sideBoardFloat.style.animation = "closeSideBoard .8s forwards";
                closerSpan[1].style.display = "none";
                closerSpan[0].style.display = "flex";
                setView("principal");
            }}>
                <IconContext.Provider value={{ size: "0.7em" }}>
                    <FaAngleUp />
                </IconContext.Provider>
            </span>
        </div>
    </section>
}

export default SideBoardFloat;