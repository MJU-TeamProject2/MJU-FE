describe('Home Component Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/clothes/all*', {
      fixture: 'allClothes.json',
    }).as('getAllClothes')
    cy.intercept('GET', '/api/v1/clothes/by/OUTERWEAR*', {
      fixture: 'allClothes.json',
    }).as('getOuterwearClothes')

    cy.visit('/')
    cy.wait('@getAllClothes')
  })

  it('상품 목록이 정상적으로 표시되어야 함', () => {
    cy.get('div').contains('여성 숏 패딩').should('exist')
    cy.get('img[alt="여성 숏 패딩"]').should('be.visible')
    cy.contains('200,000원').should('exist')
  })

  it('카테고리 탭이 모두 표시되어야 함', () => {
    ;['ALL', 'OUTERWEAR', 'TOPS', 'PANTS', 'DRESSES', 'SHOES'].forEach(
      (category) => {
        cy.contains(category).should('be.visible')
      }
    )
  })

  it('카테고리 변경이 정상적으로 작동해야 함', () => {
    cy.contains('OUTERWEAR').click()
    cy.wait('@getOuterwearClothes')
    cy.contains('여성 숏 패딩').should('exist')
  })

  it('페이지네이션이 정상적으로 표시되어야 함', () => {
    cy.contains('1 / 1').should('exist')
    cy.contains('이전').should('be.disabled')
    cy.contains('다음').should('be.disabled')
  })

  it('상품 클릭 시 상세 페이지로 이동해야 함', () => {
    cy.contains('여성 숏 패딩').click()
    cy.url().should('include', '/products/1')
  })

  it('로딩 상태가 정상적으로 표시되어야 함', () => {
    cy.intercept('GET', '/api/v1/clothes/all*', {
      delay: 1000,
      fixture: 'allClothes.json',
    }).as('slowResponse')

    cy.visit('/')
    cy.contains('Loading...').should('be.visible')
    cy.wait('@slowResponse')
    cy.contains('Loading...').should('not.exist')
  })

  it('에러 상태가 정상적으로 표시되어야 함', () => {
    cy.intercept('GET', '/api/v1/clothes/all*', {
      statusCode: 500,
      body: 'Server error',
    }).as('errorResponse')

    cy.visit('/')
    cy.wait('@errorResponse')
    cy.contains('Failed to fetch styles. Please try again.').should(
      'be.visible'
    )
  })
})
