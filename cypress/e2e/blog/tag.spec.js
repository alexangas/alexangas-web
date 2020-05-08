/// <reference types="Cypress" />

describe("Tag", () => {
  beforeEach(() => {
    cy.visit("/blog/")
      .get(".tag")
      .first()
      .click()
  })

  it("Should verify the lighthouse scores", () => {
    cy.audit({
      accessibility: 100,
      "best-practices": 93,
      seo: 100
    });
  });

  describe("Accessibility tests", () => {
    beforeEach(() => {
      cy.get("main").injectAxe()
    })
    it("Has no detectable accessibility violations on load", () => {
      cy.checkA11y()
    })
  })
})
