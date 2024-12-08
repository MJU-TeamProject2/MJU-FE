describe('장바구니 테스트', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[type="text"]').type('qqq@mju.ac.kr')
    cy.get('input[type="password"]').type('qqq')
    cy.contains('로그인').click()

    cy.intercept('GET', '/api/v1/carts', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            cartId: 5000,
            clothesId: 2,
            name: '스카이블루 셔츠',
            quantity: 2,
            price: 12000,
            discount: 0,
          },
        ],
      },
    }).as('getCartItems')

    cy.intercept('PATCH', '/api/v1/carts', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          cartId: 5000,
          quantity: 3, // 수량 증가 Mock 데이터
        },
      },
    }).as('updateCart')

    cy.intercept('DELETE', '/api/v1/carts/*', {
      statusCode: 200,
      body: {
        success: true,
      },
    }).as('deleteCartItem')

    cy.visit('/cart')
    cy.wait('@getCartItems')
  })

  it('+ 버튼 클릭 시 수량 증가 및 가격 업데이트', () => {
    cy.get('svg.lucide-plus').click()

    cy.wait('@updateCart')

    cy.contains('3개').should('be.visible')
    cy.contains('36,000원').should('be.visible')
  })

  it('- 버튼 클릭 시 수량 감소 및 가격 업데이트', () => {
    cy.get('svg.lucide-minus').click()

    cy.wait('@updateCart')

    cy.contains('1개').should('be.visible')
    cy.contains('12,000원').should('be.visible')
  })

  it('개별 상품 삭제', () => {
    cy.get('svg.lucide-x').click()

    cy.wait('@deleteCartItem')

    cy.contains('스카이블루 셔츠').should('not.exist')
  })

  it('전체 선택 후 선택 삭제', () => {
    cy.get('input[type="checkbox"]').check()

    cy.contains('선택 삭제').click()

    cy.wait('@deleteCartItem')

    cy.contains('스카이블루 셔츠').should('not.exist')
  })

  it('주문하기 버튼 클릭 시 /order로 이동', () => {
    cy.get('input[type="checkbox"]').check()

    cy.contains('주문하기').click()

    cy.url().should('include', '/order')
  })
})

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Cannot read properties of undefined')) {
    return false
  }
})
