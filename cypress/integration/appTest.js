/// <reference types="Cypress" />

const URL = "127.0.0.1:8080";

context("testExchange", () => {
  before(() => {
    cy.visit(URL);
  });

  describe("Testea la seleccion de fechas", () => {
    it("Si la fecha esta vacia muestra un error", () => {
      cy.get("#boton").click();
      cy.get("#fecha").should("have.value", "");
      cy.get("#fecha-error").should("not.have.class", "is-hidden");
    });
    it("Si luego elegimos una, el error debe desaparecer", () => {
      cy.get("#fecha").type("2020-02-15");
      cy.get("#boton").click();
      cy.get("#fecha-error").should("have.class", "is-hidden");
    });
  });

  describe("Testea la seleccion de pares", () => {
    it("Si no hay pares seleccionados muestra error", () => {
      cy.get("#pares-container")
        .find("input")
        .each((input) => {
          cy.get(input).should("not.be.checked");
        });
      cy.get("#pares-error").should("not.have.class", "is-hidden");
    });
    it("Si luego seleccionamos uno, el error debe desaparecer", () => {
      cy.get("#pares-container")
        .find("input")
        .each((input) => {
          cy.get(input).check();
        });

      cy.get("#pares-container")
        .find("input")
        .each((input) => {
          cy.get(input).should("be.checked");
        });
    });
  });

  describe("Testea que el monto sea mayor a 0", () => {
    it("Si el numero es menor a 0 muestra un error", () => {
      cy.get("#monto").then(($input) => {
        $input[0].setAttribute("value", "-5");
      });
      cy.get("#boton").click();
      cy.get("#monto-error").should("not.have.class", "is-hidden");
    });
    it("Si luego se selecciona uno mayor a 0 el error debe desaparecer", () => {
      cy.get("#monto").then(($input) => {
        $input[0].setAttribute("value", "1");
      });
      cy.get("#boton").click();
      cy.get("#monto-error").should("have.class", "is-hidden");
    });
  });

  describe("Testea que los datos se muestre correctamente", () => {
    it("Luego de continuar debe aparecer la lista", () => {
      cy.get("#precios").find("li").should("have.length.above", 0);
    });
    it("Si se saca un par y se apreta continuar, deberia borrar el par quitado", () => {
      cy.get("#pares-container input:first").uncheck();
      cy.get("#boton").click();
      cy.get("#precios").find("li").should("have.length", 6);
    });
  });
});
