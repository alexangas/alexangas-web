/// <reference types="Cypress" />

describe(`Tag List`, () => {
  beforeEach(() => {
    cy.visit(`/blog/tags/`)
  })

  it(`Should verify the lighthouse scores`, () => {
    cy.lighthouse({
      accessibility: 98,
      "best-practices": 92,
      seo: 100,
    })
  })

  describe(`Accessibility tests`, () => {
    beforeEach(() => {
      cy.get(`main`).injectAxe()
    })
    it(`Has no detectable accessibility violations on load`, () => {
      cy.checkA11y()
    })
  })

  describe(`Tags`, () => {
    it(`Contains tags`, () => {
      cy.get(`.section ul`).find(`a`).its(`length`).should(`be.gte`, 3)
    })
  })
})
