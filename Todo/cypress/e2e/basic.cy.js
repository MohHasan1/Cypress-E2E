/// <reference types="Cypress" />
///  Get ts help

describe("task page", () => {
  it("should render the main image", () => {
    cy.visit("http://localhost:5173");
    cy.get(" img"); // gets all the images in the entire page
    cy.get(".main-header img"); // gets all the images in .main-header div
    // cy.get(".main-header").get("img"); // Don't chain get, might give you wrong result - both get are independent
    cy.get(".main-header").find("img"); // find will look inside main-header
  });

  it("should display the page title", () => {
    cy.visit("http://localhost:5173");
    cy.get("h1").should("have.length", 1); // custom assertion
    cy.get("h1").contains("React Tasks"); // more specific (auto assertion)
    cy.contains("React Tasks"); // less specific (auto assertion)
  });


});

// contains is used to search my text/label
// get is by id, class, more 
// find only work using DOM elements
