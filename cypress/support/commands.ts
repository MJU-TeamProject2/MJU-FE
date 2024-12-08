/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      login(email: string, password: string): Chainable<void>
      setSessionStorage(key: string, value: string): Chainable<void>
      getSessionStorage(key: string): Chainable<string | null>
      clearSessionStorage(): Chainable<void>
    }
  }
}

import 'cypress'
import 'cypress-file-upload'

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('input[type="text"]').type(email)
  cy.get('input[type="password"]').type(password)
  cy.get('button[type="submit"]').click()
})

// sessionStorage 관련 커맨드 수정
Cypress.Commands.add('setSessionStorage', (key: string, value: string) => {
  cy.window().then((win: Window) => {
    win.sessionStorage.setItem(key, value)
  })
})

Cypress.Commands.add('getSessionStorage', (key: string) => {
  return cy.window().then((win: Window) => {
    return win.sessionStorage.getItem(key)
  })
})

Cypress.Commands.add('clearSessionStorage', () => {
  cy.window().then((win: Window) => {
    win.sessionStorage.clear()
  })
})

export {}
