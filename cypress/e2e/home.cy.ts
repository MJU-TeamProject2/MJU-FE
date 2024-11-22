import { mount } from 'cypress/react'

describe('Home Component Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/clothes/all*', {
      fixture: 'allClothes.json',
    }).as('getClothes')

    cy.visit('/')
    cy.wait('@getClothes')
  })

  it('상품 그리드가 정상적으로 표시되어야 함', () => {
    cy.get('[data-cy=product-grid]').should('have.length.gt', 0)
  })
})
