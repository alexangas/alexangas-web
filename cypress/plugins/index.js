/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const { lighthouse, pa11y, prepareAudit } = require("cypress-audit")

module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)

  // Cypress Audit
  on("before:browser:launch", (browser = {}, launchOptions) => {
    prepareAudit(launchOptions)
  })
  on("task", {
    lighthouse: lighthouse(), // calling the function is important
    pa11y: pa11y(), // calling the function is important
  })
}
