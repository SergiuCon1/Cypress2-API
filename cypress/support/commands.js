// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { faker } = require("@faker-js/faker");

let petstoreUrl = "https://petstore.swagger.io/v2/user/";
let fakerID = 12312;
let fakerFirstName = "Sergiu";
let fakerLastName = "Contevici";
let fakerUsername = fakerFirstName + " " + fakerLastName;
let fakerEmail = "sergiu@mailinator.com";
let fakerPassword = "CC1231321";
let fakerPhone = "+15606516541";
let fakerUserStatus = 2;
let updateFakerID = 2342;
let updateFakerFirstName = "Petr";
let updateFakerLastName = "Ivanov";
let updateFakerUsername = updateFakerFirstName + " " + updateFakerLastName;
let updateFakerEmail = "petr@mailinator.com";
let updateFakerPassword = "cc12341564";
let updateFakerPhone = "+4165106510";
let updateFakerUserStatus = 3;

Cypress.Commands.add("createNewUser", () => {
  cy.request({
    method: "POST",
    url: petstoreUrl,
    body: {
      id: fakerID,
      username: fakerUsername,
      firstName: fakerFirstName,
      lastName: fakerLastName,
      email: fakerEmail,
      password: fakerPassword,
      phone: fakerPhone,
      userStatus: fakerUserStatus,
    },
  }).then(({ body: user }) => {
    cy.log(user);
    expect(Number(user.message)).to.eq(fakerID);
  });
});

Cypress.Commands.add("getUser", () => {
  cy.request({
    method: "GET",
    url: petstoreUrl + fakerUsername,
  }).then((repsonse) => {
    expect(repsonse.body.id).to.eq(fakerID);
    expect(repsonse.body.username).to.eq(fakerUsername);
    expect(repsonse.body.firstName).to.eq(fakerFirstName);
    expect(repsonse.body.lastName).to.eq(fakerLastName);
    expect(repsonse.body.email).to.eq(fakerEmail);
    expect(repsonse.body.password).to.eq(fakerPassword);
    expect(repsonse.body.phone).to.eq(fakerPhone);
    expect(repsonse.body.userStatus).to.eq(fakerUserStatus);
  });
});

Cypress.Commands.add("updateUser", () => {
  cy.request({
    method: "PUT",
    url: petstoreUrl + fakerUsername,
    body: {
      id: updateFakerID,
      username: updateFakerUsername,
      firstName: updateFakerFirstName,
      lastName: updateFakerLastName,
      email: updateFakerEmail,
      password: updateFakerPassword,
      phone: updateFakerPhone,
      userStatus: updateFakerUserStatus,
    },
  }).then(({ body: user }) => {
    cy.log(user);
    expect(Number(user.message)).to.eq(updateFakerID);
  });
});

Cypress.Commands.add("getUpdatedUser", () => {
  cy.request({
    method: "GET",
    url: petstoreUrl + updateFakerUsername,
  }).then((repsonse) => {
    expect(repsonse.body.id).to.eq(updateFakerID);
    expect(repsonse.body.username).to.eq(updateFakerUsername);
    expect(repsonse.body.firstName).to.eq(updateFakerFirstName);
    expect(repsonse.body.lastName).to.eq(updateFakerLastName);
    expect(repsonse.body.email).to.eq(updateFakerEmail);
    expect(repsonse.body.password).to.eq(updateFakerPassword);
    expect(repsonse.body.phone).to.eq(updateFakerPhone);
    expect(repsonse.body.userStatus).to.eq(updateFakerUserStatus);
  });
});

Cypress.Commands.add("removeUser", () => {
  cy.request({
    method: "DELETE",
    url: petstoreUrl + fakerUsername,
  }).then(({ body: user }) => {
    cy.log(user);
    expect(user.message).to.eq(fakerUsername);
  });
});

Cypress.Commands.add("checkUserWasRemoved", () => {
  cy.request({
    method: "GET",
    url: petstoreUrl + fakerUsername,
    failOnStatusCode: false,
  }).then((repsonse) => {
    expect(repsonse.status).to.eq(404);
    expect(repsonse.body.message).to.eq("User not found");
  });
});

Cypress.Commands.add("removeUpdatedUser", () => {
  cy.request({
    method: "DELETE",
    url: petstoreUrl + updateFakerUsername,
  }).then(({ body: user }) => {
    cy.log(user);
    expect(user.message).to.eq(updateFakerUsername);
  });
});

Cypress.Commands.add("checkUpdatedUserWasRemoved", () => {
  cy.request({
    method: "GET",
    url: petstoreUrl + updateFakerUsername,
    failOnStatusCode: false,
  }).then((repsonse) => {
    expect(repsonse.status).to.eq(404);
    expect(repsonse.body.message).to.eq("User not found");
  });
});
