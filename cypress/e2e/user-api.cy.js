/// <reference types="Cypress" />

describe("User operations - API", () => {
  it("Create new user", () => {
    cy.createNewUser();
    cy.getUser();
    cy.removeUser();
    cy.checkUserWasRemoved();
  });

  it("Update existing user", () => {
    cy.createNewUser();
    cy.updateUser();
    cy.getUpdatedUser();
    cy.removeUpdatedUser();
    cy.checkUpdatedUserWasRemoved();
  });

  it("Remove existing user", () => {
    cy.createNewUser();
    cy.getUser();
    cy.removeUser();
    cy.checkUserWasRemoved();
  });
});
