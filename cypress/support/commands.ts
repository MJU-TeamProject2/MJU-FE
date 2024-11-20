/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): Chainable<void>
      intercept(method: string, url: string, response?: any): Chainable<null>
      intercept(url: string, response?: any): Chainable<null>
    }
  }
}

import 'cypress'

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('input[type="text"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

export {}
