/// <reference types="Cypress" />

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");

    cy.get('[data-cy="contact-input-message"]').type("message");
    cy.get('[data-cy="contact-input-name"]').type("name");
    cy.get('[data-cy="contact-input-email"]').type("email@gmail.com");
    // cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").and("not.have.attr", "disabled"); // alt
    // cy.get('[data-cy="contact-btn-submit"]').contains("Send Message").should("not.have.attr", "disabled"); // alt
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
    cy.get('[data-cy="contact-btn-submit"]').should(
      "not.have.attr",
      "disabled"
    );
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').contains("Sending...");
    cy.get('[data-cy="contact-btn-submit"]').should("have.attr", "disabled");

    // String re-usable element as alias
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    cy.get("@submitBtn").click();

    // Working will element directly (wrapper around the real DOM element)
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      // all the values used in should function as string can be used as assertion with expect
      expect(el.attr("disabled")).to.be.equal("disabled");
      expect(el.text()).to.equal("Sending...");
    });

    // Simulating key presses
    cy.get('[data-cy="contact-input-message"]').type(" message{enter}");
  });

  it("should validate the from input", () => {
    cy.visit("http://localhost:5173/about");

    // Cypress has a timeframe, which is used by cypress to check if expectation is met or not (imp)
    // default is 4sec
    cy.get('[data-cy="contact-btn-submit"]').as("btn");
    cy.get("@btn").click();
    cy.get("@btn").contains("Send Message");
    // above is not a great test due to how cypress uses timeframe.
    // here empty form should not be submitted - so no loading.
    // but if loading happens and stops with the timeframe, our test wont catch it.
    // its a very subtle thing - but very imp behavior to be aware of.

    // to ensure timeframe is "bypassed" one way is to use then method to directly check teh element attr.
    cy.get("@btn").click();
    cy.get("@btn").then((el) => {
      expect(el).to.not.have.attr("disabled");
      expect(el).to.not.have.text("Sending...");
    });
    cy.get("@btn").contains("Send Message");

    // If you want to ensure an element is focused before blurring, try using .focus() before .blur().
    cy.get('[data-cy="contact-input-message"]').blur();
    cy.get('[data-cy="contact-input-message"]')
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    //   .then((el) => {
    //     expect(el.attr("class")).to.contain("invalid");
    //   });

    cy.get('[data-cy="contact-input-name"]').focus().blur();
    cy.get('[data-cy="contact-input-name"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).to.contain("invalid");
      });
    cy.get('[data-cy="contact-input-email"]').focus().blur();
    cy.get('[data-cy="contact-input-email"]')
      .parent()
      .should((el) => {
        expect(el.attr("class")).to.contain("invalid");
      });

    // above example could be replaced with alias.
  });
});

// To open cypress studio: npx cypress open
// To run cypress test {headless mode}: npx cypress run

// Note test might behave differently when in both, so better run both
// 1. try using data-cy as headless mode can smt get the elements successfully
// 2. smts u need to change ur test like replacing  then with should
// should and then are interchange and should is more stable