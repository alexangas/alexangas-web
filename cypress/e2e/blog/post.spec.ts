/// <reference types="Cypress" />

describe(`Blog Post`, () => {
  describe(`Lighthouse tests`, () => {
    it(`First post passes the Lighthouse tests`, () => {
      cy.visit(`/blog/`).get(`.content h2 a`).first().click()
      cy.location(`pathname`).should(`not.equal`, `/blog/`)
      cy.get(`main`)
      cy.lighthouse({
        accessibility: 100,
        "best-practices": 93,
        seo: 100,
      })
      cy.pa11y()
    })

    it(`Last post passes the Lighthouse tests`, () => {
      cy.visit(`/blog/`).get(`.content h2 a`).last().click()
      cy.location(`pathname`).should(`not.equal`, `/blog/`)
      cy.get(`main`)
      cy.lighthouse({
        accessibility: 100,
        "best-practices": 93,
        seo: 100,
      })
      cy.pa11y()
    })
  })

  describe(`Accessibility tests`, () => {
    xit(`First post has no detectable accessibility violations on load`, () => {
      cy.visit(`/blog/`).get(`.content h2 a`).first().click()
      cy.location(`pathname`).should(`not.equal`, `/blog/`)
      cy.get(`main`).injectAxe().checkA11y()
    })

    it(`Last post has no detectable accessibility violations on load`, () => {
      cy.visit(`/blog/`).get(`.content h2 a`).last().click()
      cy.location(`pathname`).should(`not.equal`, `/blog/`)
      cy.get(`main`).injectAxe().checkA11y()
    })
  })

  describe(`Article header`, () => {
    beforeEach(() => {
      cy.visit(`/blog/`).get(`.content a`).first().click()
      cy.location(`pathname`).should(`not.equal`, `/blog/`)
    })

    it(`Header contains a title`, () => {
      cy.get(`.section header h1`).its(`length`).should(`be.eq`, 1)
    })

    xit(`Blog summary contains a timestamp`, () => {
      cy.get(`.blog-metadata time`).its(`length`).should(`be.eq`, 1)
    })

    it(`Blog summary contains a tag`, () => {
      cy.get(`.blog-metadata .tag`).first().its(`length`).should(`be.eq`, 1)
    })
  })
})
