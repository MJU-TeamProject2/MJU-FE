describe('주문 내역 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/login')
    cy.get('input[type="text"]').type('qqq@mju.ac.kr')
    cy.get('input[type="password"]').type('qqq')
    cy.contains('로그인').click()

    // 주문 내역 요청을 위한 Mock 설정
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
    cy.visit('/orderHistory') // 주문 내역 페이지로 이동

    // 주문 내역이 화면에 표시되는지 확인
    cy.contains('스카이블루 셔츠').should('be.visible')
    cy.contains('사이즈: L').should('be.visible')
  })

  it('삭제 버튼을 누르면 삭제된다', () => {
    cy.visit('/orderHistory') // 주문 내역 페이지로 이동

    // 주문 내역이 표시되고 삭제 버튼이 활성화되어 있는지 확인
    cy.contains('스카이블루 셔츠').should('be.visible')
    cy.contains('삭제').should('be.visible').and('not.be.disabled')

    // 삭제 요청 인터셉트 설정
    cy.intercept('DELETE', '/api/v1/orders/1234', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteOrder')

    // 삭제 버튼 클릭
    cy.contains('삭제').first().click()

    // DELETE 요청 대기
    cy.wait('@deleteOrder', { timeout: 10000 }).then((interception) => {
      cy.log('DELETE request interception:', interception)
      expect(interception.response.statusCode).to.eq(200)
    })

    // 페이지를 새로 고침하여 상태 업데이트 확인
    cy.reload()

    // 삭제된 주문 확인 (주문이 더 이상 존재하지 않아야 함)
    cy.contains('스카이블루 셔츠').should('not.exist')
  })
})
