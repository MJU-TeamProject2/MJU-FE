describe('어드민 주문 내역 페이지 테스트', () => {
  before(() => {
    // 어드민 로그인
    cy.visit('/adminLogin');
    cy.get('input[type="text"]').type('Admin001');
    cy.get('input[type="password"]').type('admin1');
    cy.get('button[type="submit"]').click({ force: true });

    // 주문 내역 요청을 위한 Mock 설정
    cy.intercept('GET', '/api/v1/admin/orders?page=0&size=20', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            orderId: 1001,
            name: '검정 티셔츠',
            quantity: 1,
            price: 15000,
            size: 'M',
            orderStatus: 'PREPARING',
            createdAt: '2024-12-07T10:00:00Z',
          },
        ],
      },
    }).as('getAdminOrders');
  });

  it('완료 버튼을 누르면 상태가 "SHIPPING"으로 변경된다', () => {
    cy.visit('/adminOrderHistory'); // 어드민 주문 내역 페이지로 이동

    // Mock 응답 대기
    cy.wait('@getAdminOrders').its('response.statusCode').should('eq', 200);

    // "완료" 버튼 클릭
    cy.intercept('PATCH', '/api/v1/admin/orders', {
      statusCode: 200,
      body: { success: true },
    }).as('updateAdminOrder');

    cy.contains('완료').click();

    // PATCH 요청 확인
    cy.wait('@updateAdminOrder').its('response.statusCode').should('eq', 200);

    // 주문 상태 업데이트 확인
    cy.contains('SHIPPING').should('be.visible');
  });

  it('주문 내역이 없으면 "주문 내역이 없습니다" 메시지가 표시된다', () => {
    // 주문 내역 없는 Mock 설정
    cy.intercept('GET', '/api/v1/admin/orders?page=0&size=20', {
      statusCode: 200,
      body: { success: true, data: [] },
    }).as('getNoOrders');

    cy.visit('/adminOrderHistory'); // 어드민 주문 내역 페이지로 이동

    // Mock 응답 대기
    cy.wait('@getNoOrders').its('response.statusCode').should('eq', 200);

    // 주문 내역 없음 메시지 확인
    cy.contains('관리자 주문이 없습니다').should('be.visible');
  });
});
