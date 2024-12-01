/// <reference types="cypress" />

describe('어드민 메인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/adminHome')
  })

  it('페이지가 올바르게 로드되어야 한다', () => {
    cy.contains('등록된 의상 목록').should('be.visible')
    cy.contains('상품 정보를 수정하려면 해당 상품을 클릭해주세요').should(
      'be.visible'
    )
  })

  it('should display correct content for each item', () => {
    // 첫 번째 아이템 확인
    cy.get('[class*="sc-fLqhfm gmcWn"]')
      .first()
      .within(() => {
        // 상품명 확인
        cy.get('[class*="sc-kNwsoS fHzTJ"]')
          .should('contain', '여성 숏 패딩')
          .and('be.visible')

        // 가격 확인
        cy.get('[class*="sc-dTSHqv jgNaSf"]')
          .should('contain', '200,000원')
          .and('be.visible')
      })
  })

  it('페이지네이션이 올바르게 작동해야 한다', () => {
    // 초기 페이지 확인
    cy.contains('1 / 1').should('be.visible')

    // 이전 버튼이 첫 페이지에서 비활성화되어 있는지 확인
    cy.contains('이전').should('be.disabled')
  })

  it('의류 아이템 클릭 시 수정 페이지로 이동해야 한다', () => {
    cy.contains('여성 숏 패딩').click()
    cy.url().should('include', '/productsModify/1')
  })

  it('상품 등록 버튼 클릭 시 등록 페이지로 이동해야 한다', () => {
    cy.get('svg[class="lucide lucide-package"]').click()
    cy.url().should('include', '/registerCloth')
  })
})
