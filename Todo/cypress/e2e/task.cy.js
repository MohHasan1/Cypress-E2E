/// <reference types="Cypress" />

describe("task management", () => {
  it("should open and close the new task model", () => {
    cy.visit("http://localhost:5173");

    // Yield an element
    cy.contains("Add Task").click();
    cy.get(".backdrop").click({ force: true });
    cy.get(".backdrop").should("not.exist");
    cy.get("dialog.modal").should("not.exist");

    cy.contains("Add Task").click();
    cy.contains("Cancel").click();
    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");
  });

  it("should create a new task", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Add Task").click(); // get element by text
    cy.get("#title").type("new task");
    cy.get("#summary").type("new summary");
    cy.get(".modal").contains("Add Task").click();

    cy.get(".backdrop").should("not.exist");
    cy.get(".modal").should("not.exist");

    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("new task"); // we can use find for h2
    cy.get(".task p").contains("new summary"); // we can use find for p
  });

  it("should validate user input", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Add Task").click();
    cy.get(".modal").contains("Add Task").click();
    cy.get(".modal").contains("Please provide values");
  });

  it("should filter task", () => {
    cy.visit("http://localhost:5173");

    cy.contains("Add Task").click();
    cy.get("#title").type("new task");
    cy.get("#summary").type("new summary");
    cy.get("#category").select("urgent");
    cy.get(".modal").contains("Add Task").click();

    cy.get(".task").should("have.length", 1);
    cy.get(".task h2").contains("new task"); 
    cy.get(".task p").contains("new summary"); 

    cy.get("#filter").select("moderate");
    cy.get(".task").should("have.length", 0); // .task is an li element

    cy.get("#filter").select("urgent");
    cy.get(".task").should("have.length", 1); // .task is an li element
  
    cy.get("#filter").select("all");
    cy.get(".task").should("have.length", 1); // .task is an li element
  });
});
