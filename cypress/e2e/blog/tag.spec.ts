/// <reference types="Cypress" />

describe(`Tag`, () => {
  beforeEach(() => {
    cy.visit(`/blog/`).get(`.tag`).first().click()
    cy.location(`pathname`).should(`contain`, `/blog/tags/`)
  })

  it(`Should verify the lighthouse scores`, () => {
    cy.lighthouse({
      accessibility: 100,
      "best-practices": 93,
      seo: 100,
    })
    cy.pa11y()
  })

  describe(`Accessibility tests`, () => {
    beforeEach(() => {
      cy.get(`main`).injectAxe()
    })
    it(`Has no detectable accessibility violations on load`, () => {
      cy.checkA11y()
    })
  })
})
