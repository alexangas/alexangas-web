/// <reference types="Cypress" />

describe(`Contact`, () => {
  beforeEach(() => {
    cy.visit(`/contact/`)
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

  describe(`Submit`, () => {
    it(`Submits form`, () => {
      cy.intercept(`POST`, `https://getform.io/f/**`)
        .as(`postForm`)
        .get(`#name`)
        .type(`FirstName LastName`)
        .get(`#email`)
        .type(`firstname.lastname@alexangas.com`)
        .get(`#text`)
        .type(`Cypress test message`)
        .get(`form`)
        .submit()
        .wait(`@postForm`)
        .get(`.notification`)
        .should(`have.class`, `is-success`)
        .get(`button[type=submit]`)
        .should(`be.disabled`)
        .get(`button[type=reset]`)
        .should(`be.disabled`)
    })

    it(`Shows submission progress`, () => {
      cy.intercept(
        {
          method: `POST`,
          url: `https://getform.io/f/**`,
        },
        {
          delayMs: 5000,
          body: ``,
        }
      )
        .as(`postForm`)
        .get(`#name`)
        .type(`FirstName LastName`)
        .get(`#email`)
        .type(`firstname.lastname@alexangas.com`)
        .get(`#text`)
        .type(`Cypress test message`)
        .get(`form`)
        .submit()
        .get(`button[type=submit]`)
        .should(`have.class`, `is-loading`)
        .get(`button[type=reset]`)
        .should(`be.disabled`)
    })
  })
})
