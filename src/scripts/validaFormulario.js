function validarFormulario() {
  let fecha = validarFecha();
  let pares = validarPares();
  let monto = validarMonto();
  if (fecha && pares && monto) {
    return true;
  }
  return false;
}

function validarFecha() {
  const fecha = $("#fecha");
  const error = $("#fecha-error");
  if (!fecha.val()) {
    mostrarError(error);
    ponerInputRojo(fecha);
    return false;
  }
  if (fecha.val() !== "" && fecha.hasClass("is-danger")) {
    sacarError(fecha);
    esconderError(error);
  }
  return true;
}

function validarPares() {
  const error = $("#pares-error")
  if (!obtenerSimbolos()) {
    mostrarError(error);
    return false;
  }
  if (obtenerSimbolos()) {
    esconderError(error);
  }
  return true;
}

function validarMonto() {
  const monto = $("#monto");
  const error = $("#monto-error");

  if (monto.val() <= 0) {
    mostrarError(error);
    ponerInputRojo(monto);
    return false;
  }
  if (monto.val() > 0 && monto.hasClass("is-danger")) {
    sacarError(monto);
    esconderError(error);
  }
  return true;

}

function sacarError(el) {
  el.removeClass("is-danger");
  if (el.hasClass("fecha")) {
    el.addClass("is-primary");
  }
}

function esconderError(el) {
  el.addClass("is-hidden");
}

function mostrarError(el) {
  el.removeClass("is-hidden");
}

function ponerInputRojo(el) {
  el.removeClass("is-primary");
  el.addClass("is-danger");
}
