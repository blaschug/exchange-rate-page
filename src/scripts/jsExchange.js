const $boton = $("#boton");
$boton[0].onclick = pares;

function pares(e) {
  if (validaFormulario()) {
    muestraResultados();
    fetch(
      `https://api.exchangerate.host/${$("#selecciona-fecha")[0].value}?base=${
        $("#seleccion")[0].value
      }&symbols=${devuelveSimbolos()}&amount=${monto()}`
    )
      .then((respuesta) => respuesta.json())
      .then((respuestaJSON) => {
        $("#precios").text(
          `Cambios del dia ${respuestaJSON.date} en base ${respuestaJSON.base}`
        );
        Object.keys(respuestaJSON.rates).forEach((moneda) => {
          $("#precios").append(
            $(
              `<li><strong>${moneda}</strong>: ${respuestaJSON.rates[moneda]}</li>`
            )
          );
        });
      })
      .catch((error) => console.error("Fallo:", error));
    e.preventDefault();
  }
  e.preventDefault();
}

function muestraResultados() {
  const $precios = $("#precios");
  $precios.removeClass("is-hidden");
}

function monto() {
  let monto = $("#monto")[0].value;
  if (monto) {
    return monto;
  } else {
    return 1;
  }
}

function devuelveSimbolos() {
  let pares = "";
  let cantidadPares = $("#pares");
  let asd = document.querySelectorAll(".elegir");
  for (let i = 0; i < asd.length; i++) {
    if (asd[i].checked) {
      let palabra = cantidadPares[0].children[i + 1].innerText.slice(1, 4);
      pares = pares + `${palabra},`;
    }
  }
  return pares.slice(0, -1);
}

function validaFormulario() {
  let fecha = validadorFecha();
  let cambio = validadoTipoCambio();
  let pares = validaPares();
  if (fecha && cambio && pares) {
    return true;
  }
  return false;
}
