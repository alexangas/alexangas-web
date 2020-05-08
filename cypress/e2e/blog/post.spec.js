/// <reference types="Cypress" />

describe("Blog Post", () => {
  describe("Accessibility tests", () => {
    it("First post has no detectable accessibility violations on load", () => {
      cy.visit("/blog/")
        .get(".blog__post--summary a")
        .first()
        .click()
        .get("main")
        .injectAxe()
        .checkA11y()
    })

    it("Last post has no detectable accessibility violations on load", () => {
      cy.visit("/blog/")
        .get(".blog__post--summary a")
        .last()
        .click()
        .get("main")
        .injectAxe()
        .checkA11y()
    })
  })

  describe("Header", () => {
    beforeEach(() => {
      cy.visit("/blog/").get(".blog__post--summary a").first().click()
    })

    it("Links to the blog home page", () => {
      cy.get("header a")
        .should("contain.text", "Alex Angas")
        .should("have.attr", "href", "/blog/")
    })
  })
})
