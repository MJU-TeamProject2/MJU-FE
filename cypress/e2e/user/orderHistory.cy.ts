describe('주문 내역 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[type="text"]').type('qqq@mju.ac.kr')
    cy.get('input[type="password"]').type('qqq')
    cy.contains('로그인').click()

    cy.intercept('GET', '/api/v1/orders', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            orderId: 1234,
            clothesId: 2,
            name: '스카이블루 셔츠',
            quantity: 2,
            price: 12000,
            size: 'L',
            orderStatus: 'Completed',
            createdAt: '2024-12-07T12:00:00Z',
            imageUrl: 'some-image-url',
            detailUrl: 'some-detail-url',
          },
        ],
      },
    }).as('getOrderHistory')
  })

  it('주문 내역이 나온다', () => {
    cy.visit('/orderHistory')

    // 주문 내역이 화면에 표시되는지 확인
    cy.contains('스카이블루 셔츠').should('be.visible')
    cy.contains('사이즈: L').should('be.visible')
  })

  it('삭제 버튼을 누르면 삭제된다', () => {
    cy.visit('/orderHistory')

    cy.contains('스카이블루 셔츠').should('be.visible')
    cy.contains('삭제').should('be.visible').and('not.be.disabled')

    cy.intercept('DELETE', '/api/v1/orders/1234', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteOrder')

    cy.contains('삭제').first().click()

    cy.wait('@deleteOrder', { timeout: 10000 }).then((interception: any) => {
      cy.log('DELETE request interception:', interception)
      expect(interception.response.statusCode).to.eq(200)
    })

    cy.reload()

    cy.contains('스카이블루 셔츠').should('not.exist')
  })
})
