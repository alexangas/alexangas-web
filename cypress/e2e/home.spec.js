/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit("/")
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
  it("Contains a blog link", () => {
    cy.findByText("Blog", { exact: false }).focus()
    cy.focused()
      .should("have.attr", "href", "/blog/")
  })
})

describe("Footer", () => {
  it("Contains the copyright message", () => {
    cy.get("footer")
      .should("contain.text", "©")
      .should("contain.text", "Alex Angas")
  })
  it("Focuses on the footer link and asserts its attributes", () => {
    cy.get('footer a')
      .should("have.attr", "href", "https://www.gatsbyjs.org")
  })
})
