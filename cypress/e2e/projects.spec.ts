/// <reference types="Cypress" />

describe(`Projects`, () => {
  beforeEach(() => {
    cy.visit(`/projects/`)
  })

  xit(`Should verify the lighthouse scores`, () => {
    cy.lighthouse({
      accessibility: 100,
      "best-practices": 92,
      seo: 100,
    })
  })

  describe(`Accessibility tests`, () => {
    beforeEach(() => {
      cy.get(`main`).injectAxe()
    })
    xit(`Has no detectable accessibility violations on load`, () => {
      cy.checkA11y()
    })
  })

  describe(`Projects`, () => {
    it(`Contains projects`, () => {
      cy.get(`.section`).find(`.card`).its(`length`).should(`be.gte`, 1)
    })
  })
})
