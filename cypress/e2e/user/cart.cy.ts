describe('장바구니 테스트', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[type="text"]').type('qqq@mju.ac.kr')
    cy.get('input[type="password"]').type('qqq')
    cy.contains('로그인').click()

    // 장바구니 데이터 Intercept (단일 상품)
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

    // 수량 증가/감소 Mock
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

    // 상품 삭제 Mock
    cy.intercept('DELETE', '/api/v1/carts/*', {
      statusCode: 200,
      body: {
        success: true,
      },
    }).as('deleteCartItem')

    cy.visit('/cart')
    cy.wait('@getCartItems') // 데이터 로드 대기
  })

  it('+ 버튼 클릭 시 수량 증가 및 가격 업데이트', () => {
    // + 버튼 클릭
    cy.get('svg.lucide-plus') // 클래스가 lucide-plus인 SVG 선택
      .click()

    // PATCH 요청 대기
    cy.wait('@updateCart')

    // 수량 및 가격 확인
    cy.contains('3개').should('be.visible') // 수량 업데이트 확인
    cy.contains('36,000원').should('be.visible') // 가격 업데이트 확인
  })

  it('- 버튼 클릭 시 수량 감소 및 가격 업데이트', () => {
    // - 버튼 클릭
    cy.get('svg.lucide-minus') // 클래스가 lucide-minus인 SVG 선택
      .click()

    // PATCH 요청 대기
    cy.wait('@updateCart')

    // 수량 및 가격 확인
    cy.contains('1개').should('be.visible') // 수량 업데이트 확인
    cy.contains('12,000원').should('be.visible') // 가격 업데이트 확인
  })

  it('개별 상품 삭제', () => {
    // 삭제 버튼 클릭
    cy.get('svg.lucide-x') // 삭제 버튼 클래스 선택
      .click()

    // DELETE 요청 대기
    cy.wait('@deleteCartItem')

    // 상품이 삭제되었는지 확인
    cy.contains('스카이블루 셔츠').should('not.exist')
  })

  it('전체 선택 후 선택 삭제', () => {
    // 전체 선택 체크박스 클릭
    cy.get('input[type="checkbox"]').check() // 체크박스 선택

    // 선택 삭제 버튼 클릭
    cy.contains('선택 삭제').click()

    // DELETE 요청 대기
    cy.wait('@deleteCartItem')

    // 모든 상품이 삭제되었는지 확인
    cy.contains('스카이블루 셔츠').should('not.exist')
  })

  it('주문하기 버튼 클릭 시 /order로 이동', () => {
    // 상품 선택
    cy.get('input[type="checkbox"]').check()

    // 주문하기 버튼 클릭
    cy.contains('주문하기').click()

    // URL 확인 (리디렉션 여부만 확인)
    cy.url().should('include', '/order')
  })
})

// 예외 처리
Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Cannot read properties of undefined')) {
    return false
  }
})
