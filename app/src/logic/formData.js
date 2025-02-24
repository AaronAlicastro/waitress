function verifyEmail(text = "") {
  const re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!re.exec(text.trim())) return "La estructura de correo no es válida";
  return false;
}

function verifyNumber(text = "") {
  const error = "Verifica los campos para números";
  const isNumber = text.trim() / 2 >= 0;

  if (!text.trim()) return error;
  if (!isNumber) return error;
  return false;
}

export function getDataOfForm(ID_frm) {
  let filled = true;
  let entrences = {};
  let error = false;

  for (let entrence of new FormData(document.querySelector(ID_frm)).entries()) {
    if (!entrence[1].trim()) filled = false;

    // verify
    if (entrence[0] === "email") error = verifyEmail(entrence[1]);
    else if (entrence[0] === "number") error = verifyNumber(entrence[1]);

    entrences[entrence[0]] = entrence[1].trim();
  }

  return { filled, entrences, error };
}
