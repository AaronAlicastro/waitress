export function getDataOfForm(ID_frm) {
    let filled = true, entrences = {}, error = false;
    for (let entrence of new FormData(document.querySelector(ID_frm)).entries()) {
        if (entrence[1].trim() == "") filled = false;
        if (entrence[0] == "email") {
            let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
            if (!re.exec(entrence[1].trim())) error = "La estructura de correo no es válida";
        }
        entrences[entrence[0]] = entrence[1].trim();
    }
    return { filled, entrences, error };
}