/// <reference types="Cypress" />

describe(`Tag`, () => {
  beforeEach(() => {
    cy.visit(`/blog/`).get(`.tag`).first().click()
    cy.location(`pathname`).should(`contain`, `/blog/tags/`)
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
})
