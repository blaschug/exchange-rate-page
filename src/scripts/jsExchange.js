const monto = $("#monto");
const precios = $("#precios");
const boton = $("#boton");
const monedaBase = $("#moneda-base");
const fecha = $("#fecha");
const body = $("body");
boton.on("click", obtenerPares);

function obtenerPares(e) {
  e.preventDefault();
  if (validarFormulario()) {
    body.addClass("waiting");
    mostrarResultados();
    fetch(crearURL(fecha.val(), monedaBase.val(), monto.val()))
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        precios.text(
          `Cambios del dia ${respuestaJSON.date} en base ${respuestaJSON.base}`
        );
        Object.keys(respuestaJSON.rates).forEach((moneda) => {
          precios.append(
            $(
              `<li><strong>${moneda}</strong>: ${respuestaJSON.rates[moneda]}</li>`
            )
          );
        });
        body.removeClass("waiting");
      })
      .catch((error) => {
        console.error("Fallo:", error);
      });
  }
}

function mostrarResultados() {
  precios.removeClass("is-hidden");
}

function obtenerSimbolos() {
  let pares = "";
  const paresContainer = $("#pares-container");
  const inputs = document.querySelectorAll(".elegir");
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
      let palabra = paresContainer[0].children[i + 1].innerText.slice(1, 4);
      pares = pares + `${palabra},`;
    }
  }
  return pares.slice(0, -1);
}

function crearURL(fecha, base, monto) {
  return `https://api.exchangerate.host/${fecha}?base=${base}&symbols=${obtenerSimbolos()}&amount=${monto}`;
}
