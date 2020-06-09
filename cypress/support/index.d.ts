declare namespace Cypress {
  type LighthouseParameters = {
    accessibility: number
    "best-practices": number
    seo: number
  }

  interface Chainable {
    lighthouse(parameters: LighthouseParameters): Chainable<Element>
    pa11y(): Chainable<Element>

    injectAxe(): Chainable<Element>
    checkA11y(): Chainable<Element>
  }
}
