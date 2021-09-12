function validadorFecha() {
  const inputFecha = $("#selecciona-fecha");
  if (!inputFecha[0].value) {
    muestraError($("#valida-fecha"));
    poneInputRojo(inputFecha);
    return false;
  }
  if (inputFecha[0].value !== "" && inputFecha.hasClass("is-danger")) {
    sacaError(inputFecha);
    escondeError($("#valida-fecha"));
  }
  return true;
}

function validadoTipoCambio() {
  const inputSeleccion = $("#seleccion");
  if (inputSeleccion[0].value === "Monedas") {
    muestraError($("#valida-moneda"));
    poneInputRojo($("#select"));
    return false;
  }
  if (
    inputSeleccion[0].value !== "Monedas" &&
    $("#select").hasClass("is-danger")
  ) {
    sacaError($("#select"));
    escondeError($("#valida-moneda"));
  }
  return true;
}

function validaPares() {
  if (!devuelveSimbolos()) {
    muestraError($("#valida-pares"));
    return false;
  }
  if (devuelveSimbolos()) {
    escondeError($("#valida-pares"));
  }
  return true;
}

function sacaError(elemento) {
  elemento.removeClass("is-danger");
  if (elemento.hasClass("fecha")) {
    elemento.addClass("is-primary");
  }
}

function escondeError(elemento) {
  elemento.addClass("is-hidden");
}

function muestraError(elemento) {
  elemento.removeClass("is-hidden");
}

function poneInputRojo(elemento) {
  elemento.removeClass("is-primary");
  elemento.addClass("is-danger");
}
