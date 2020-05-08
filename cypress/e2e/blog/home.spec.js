/// <reference types="Cypress" />

describe("Blog Home", () => {
  beforeEach(() => {
    cy.visit("/blog/")
  })

  it("Should verify the lighthouse scores", () => {
    cy.audit({
      accessibility: 100,
      "best-practices": 93,
      seo: 100,
    })
  })

  describe("Accessibility tests", () => {
    beforeEach(() => {
      cy.get("main").injectAxe()
    })
    it("Has no detectable accessibility violations on load", () => {
      cy.checkA11y()
    })
  })

  describe("Blog summary", () => {
    it("Contains blog summaries", () => {
      cy.get(".section").find(".content").its("length").should("be.gte", 3)
    })

    it("Contains a link", () => {
      cy.get(".section .content h2").first().click()
    })

    it("Contains a description", () => {
      cy.get(".section .content p").first().its("length").should("be.eq", 1)
    })

    it("Contains a timestamp", () => {
      cy.get(".section .content time").first().its("length").should("be.eq", 1)
    })

    it("Contains a tag", () => {
      cy.get(".section .content .tag").first().its("length").should("be.eq", 1)
    })
  })
})
