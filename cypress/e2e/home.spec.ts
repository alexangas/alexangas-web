/// <reference types="Cypress" />

describe(`Root Home`, () => {
  beforeEach(() => {
    cy.visit(`/`)
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

  describe(`Header`, () => {
    it(`Links to the home page`, () => {
      cy.get(`.navbar-start a`)
        .should(`contain.text`, `Alex Angas`)
        .should(`have.attr`, `href`, `/`)
    })
  })

  describe(`Contents`, () => {
    it(`Links to the contact page`, () => {
      cy.get(`.navbar-end .navbar-item:first-child`)
        .should(`contain.text`, `Contact`)
        .should(`have.attr`, `href`, `/contact/`)
    })

    it(`Links to the blog home`, () => {
      cy.get(`.navbar-end .navbar-item:last-child`)
        .should(`contain.text`, `Blog`)
        .should(`have.attr`, `href`, `/blog/`)
    })
  })

  describe(`Footer`, () => {
    it(`Contains the copyright message`, () => {
      cy.get(`footer`)
        .should(`contain.text`, `©`)
        .should(`contain.text`, `Alex Angas`)
    })
    it(`Contains the GitHub social link`, () => {
      cy.get(`footer a`)
        .should(`contain.text`, `alexangas`)
        .should(`have.attr`, `href`, `https://github.com/alexangas/`)
    })
    it(`Contains the LinkedIn social link`, () => {
      cy.get(`footer a`)
        .eq(1)
        .should(`contain.text`, `alexangas`)
        .should(`have.attr`, `href`, `https://www.linkedin.com/in/alexangas/`)
    })
  })
})
