/// <reference types="Cypress" />

describe("Blog Post", () => {
  describe("Lighthouse tests", () => {
    it("First post passes the Lighthouse tests", () => {
      cy.visit("/blog/")
        .get(".content h2 a")
        .first()
        .click()
        .get("main")
        .audit({
          accessibility: 100,
          "best-practices": 93,
          seo: 100
        });
    })

    it("Last post passes the Lighthouse tests", () => {
      cy.visit("/blog/")
        .get(".content h2 a")
        .last()
        .click()
        .get("main")
        .audit({
          accessibility: 100,
          "best-practices": 93,
          seo: 100
        });
    })
  })

  describe("Accessibility tests", () => {
    xit("First post has no detectable accessibility violations on load", () => {
      cy.visit("/blog/")
        .get(".content h2 a")
        .first()
        .click()
        .get("main")
        .injectAxe()
        .checkA11y()
    })

    it("Last post has no detectable accessibility violations on load", () => {
      cy.visit("/blog/")
        .get(".content h2 a")
        .last()
        .click()
        .get("main")
        .injectAxe()
        .checkA11y()
    })
  })

  describe("Article header", () => {
    beforeEach(() => {
      cy.visit("/blog/")
        .get(".content a")
        .first()
        .click()
    })

    it("Header contains a title", () => {
      cy.get("article header h1")
        .its("length")
        .should("be.eq", 1)
    })

    it("Blog summary contains a timestamp", () => {
      cy.get("article header time")
        .its("length")
        .should("be.eq", 1)
    })

    it("Blog summary contains a tag", () => {
      cy.get("article header .tag")
        .first()
        .its("length")
        .should("be.eq", 1)
    })
  })
})
