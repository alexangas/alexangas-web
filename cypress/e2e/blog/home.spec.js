/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit("/blog/")
})

describe("Accessibility tests", () => {
  beforeEach(() => {
    cy.get("main").injectAxe()
  })
  it("Has no detectable accessibility violations on load", () => {
    cy.checkA11y()
  })
})

describe("Header", () => {
  it("Links to the home page", () => {
    cy.get("header a")
      .should("contain.text", "Alex Angas")
      .should("have.attr", "href", "/")
  })
})

describe("Contents", () => {
  it("Contains blog links", () => {
    cy.get(".blog__post--container")
      .find(".blog__post--summary")
      .its('length').should('be.gte', 3)
  })
})
