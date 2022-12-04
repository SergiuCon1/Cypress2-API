/// <reference types="Cypress" />

const {
  faker
} = require("@faker-js/faker");

let petstoreUrl = "https://petstore.swagger.io/v2/user/";
let fakerID = faker.datatype.number();
let fakerFirstName = faker.name.firstName();
let fakerLastName = faker.name.lastName();
let fakerUsername = fakerFirstName + " " + fakerLastName;
let fakerEmail = faker.internet.email();
let fakerPassword = faker.internet.password();
let fakerPhone = faker.phone.number();
let fakerUserStatus = faker.datatype.number();
let updateFakerID = 2342;
let updateFakerFirstName = faker.name.firstName();
let updateFakerLastName = faker.name.lastName();
let updateFakerUsername = updateFakerFirstName + " " + updateFakerLastName;
let updateFakerEmail = faker.internet.email();
let updateFakerPassword = faker.internet.password();
let updateFakerPhone = faker.phone.number();
let updateFakerUserStatus = faker.datatype.number();

let userFromCreate = {};

describe("User operations - API", () => {
  it("Create new user", () => {
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
    }).then(({
      body: user
    }) => {
      cy.log(user);
      expect(Number(user.message)).to.eq(fakerID);
    });

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

  it("Update existing user", () => {
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
    }).then(({
      body: user
    }) => {
      cy.log(user);
      expect(Number(user.message)).to.eq(updateFakerID);
    });

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

  it("Remove existing user", () => {
    cy.request({
      method: "DELETE",
      url: petstoreUrl + updateFakerUsername,
    }).then(({
      body: user
    }) => {
      cy.log(user);
      expect(user.message).to.eq(updateFakerUsername);
    });

    cy.request({
      method: "GET",
      url: petstoreUrl + updateFakerUsername,
      failOnStatusCode: false,
    }).then((repsonse) => {
      expect(repsonse.status).to.eq(404);
      expect(repsonse.body.message).to.eq("User not found");
    });
  });
});