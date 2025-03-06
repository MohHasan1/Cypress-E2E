/// <reference types="Cypress" />

describe("page navigation", () => {
  it("should navigate between pages", () => {
    cy.visit("http://localhost:5173/");

    // The right to target an element (u can use cypress web to find teh best way to target an element)
    // use data-cy attr/prop in components directly for targeting during testing
    cy.get('[data-cy="header-about-link"]').click();
    cy.location("pathname").should("eq", "/about");
    cy.go("back")
    cy.location("pathname").should("eq", "/");

    cy.get('[data-cy="header-about-link"]').click();
    cy.get('[data-cy="header-home-link"]').click();
    cy.location("pathname").should("eq", "/");
  });
});
