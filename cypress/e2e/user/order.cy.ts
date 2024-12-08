describe('장바구니에서 주문 페이지로 이동 및 주소/결제수단 관리 테스트', () => {
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

    cy.intercept('GET', '/api/v1/customer/address', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            addressId: 1,
            name: '집',
            recipient: '김철수',
            baseAddress: '서울특별시 강남구',
          },
        ],
      },
    }).as('getAddresses')

    cy.intercept('GET', '/api/v1/customer/payment', {
      statusCode: 200,
      body: {
        success: true,
        data: [
          {
            paymentId: 1,
            cardNumber: '1111-2222-3333-4444',
            cardProvider: '국민카드',
          },
        ],
      },
    }).as('getPayments')

    cy.visit('/cart')
    cy.wait('@getCartItems')
  })

  const selectAllCheckboxesAndGoToOrderPage = () => {
    cy.get('input[type="checkbox"]').check()
    cy.contains('주문하기').click()
    cy.wait('@getAddresses')
    cy.wait('@getPayments')
  }

  it('주소 추가 및 삭제 테스트', () => {
    selectAllCheckboxesAndGoToOrderPage()

    cy.intercept('POST', '/api/v1/customer/address', (req) => {
      expect(req.body).to.include({
        name: '회사',
        recipient: '이영희',
        zipCode: '12345',
        baseAddress: '경기도 성남시 분당구',
        detailAddress: '정자동 123-45',
      })
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: {
            addressId: 2,
            name: '회사',
            recipient: '이영희',
            baseAddress: '경기도 성남시 분당구',
          },
        },
      })
    }).as('postAddress')

    cy.get('input[placeholder="배송지 이름"]').type('회사')
    cy.get('input[placeholder="수취인"]').type('이영희')
    cy.get('input[placeholder="우편번호"]').type('12345')
    cy.get('input[placeholder="기본 주소"]').type('경기도 성남시 분당구')
    cy.get('input[placeholder="상세 주소"]').type('정자동 123-45')
    cy.contains('추가하기').click()

    cy.wait('@postAddress')

    cy.contains('배송지 이름: 회사').should('be.visible')
    cy.contains('수취인: 이영희').should('be.visible')
    cy.contains('주소: 경기도 성남시 분당구').should('be.visible')

    cy.intercept('DELETE', '/api/v1/customer/address/1', {
      statusCode: 200,
      body: { success: true },
    }).as('deleteAddress')

    cy.contains('삭제').click()

    cy.wait('@deleteAddress')

    cy.contains('배송지 이름: 집').should('not.exist')
  })

  it('결제수단 추가 및 삭제 테스트', () => {
    selectAllCheckboxesAndGoToOrderPage()

    cy.intercept('POST', '/api/v1/customer/payment', (req) => {
      expect(req.body).to.include({
        cardNumber: '5555-6666-7777-8888',
        cardProvider: '삼성카드',
        expiryDate: '12/25',
      })
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          data: {
            paymentId: 2,
            cardNumber: '5555-6666-7777-8888',
            cardProvider: '삼성카드',
          },
        },
      })
    }).as('postPayment')

    cy.get('input[placeholder="카드 번호"]').type('5555-6666-7777-8888')
    cy.get('input[placeholder="카드사"]').type('삼성카드')
    cy.get('input[placeholder="유효기간 (MM/YY)"]').type('12/25')
    cy.get('div')
      .contains('새 결제수단 추가')
      .parent()
      .find('button')
      .contains('추가하기')
      .click()

    cy.wait('@postPayment')

    cy.contains('카드 번호: 5555-6666-7777-8888').should('be.visible')
    cy.contains('카드사: 삼성').should('be.visible')

    // 결제수단 삭제
    cy.intercept('DELETE', '/api/v1/customer/payment/1', {
      statusCode: 200,
      body: { success: true },
    }).as('deletePayment')

    cy.contains('카드 번호: 1111-2222-3333-4444') // 카드 번호 텍스트 포함 요소 찾기
      .closest('.sc-DvaoS.lctHxS') // 해당 텍스트와 가장 가까운 상위 컨테이너로 이동
      .find('.sc-bOdUTf.FPlVh') // 해당 컨테이너 내부의 삭제 버튼 찾기
      .click()

    // DELETE 요청 확인
    cy.wait('@deletePayment')

    // 삭제된 결제수단 확인
    cy.contains('카드 번호: 1111-2222-3333-4444').should('not.exist')
  })

  it('체크박스 선택 후 결제 및 리디렉션 확인', () => {
    cy.get('input[type="checkbox"]').check()
    cy.contains('주문하기').click()

    cy.wait('@getAddresses')
    cy.wait('@getPayments')

    cy.intercept('POST', '/api/v1/orders', {
      statusCode: 200,
      body: {
        success: true,
        data: { orderId: 1234 },
      },
    }).as('postOrder')

    cy.get('input[type="radio"]').should('exist').check({ force: true })

    cy.contains('24,000원 결제하기').click()

    cy.wait('@postOrder', { timeout: 10000 }).then((interception: any) => {
      expect(interception.response.statusCode).to.eq(200)
      cy.log('결제 요청이 정상적으로 발생했습니다.')
    })
  })
})
