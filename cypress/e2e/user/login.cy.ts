describe('로그인 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('로그인 페이지의 모든 요소가 올바르게 렌더링되어야 한다', () => {
    cy.contains('로그인').should('be.visible')

    cy.get('input[type="text"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', '이메일')

    cy.get('input[type="password"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', '비밀번호')

    cy.get('button[type="submit"]').should('be.visible').and('be.disabled')
  })

  it('유효한 입력값이 있을 때만 로그인 버튼이 활성화되어야 한다', () => {
    const adminCode = 'qqq@mju.ac.kr'
    const password = 'qqq'

    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('input[type="text"]').type(adminCode)
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('input[type="text"]').clear()
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').should('be.disabled')

    cy.get('input[type="text"]').type(adminCode)
    cy.get('button[type="submit"]').should('be.enabled')
  })

  it('로그인 성공 시 Home 페이지로 이동해야 한다', () => {
    cy.intercept('POST', '/api/v1/customer/login', {
      statusCode: 200,
      body: {
        success: true,
        token: 'fake-token',
      },
    }).as('loginRequest')

    cy.get('input[type="text"]').type('qqq@mju.ac.kr')
    cy.get('input[type="password"]').type('qqq')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/')
  })

  it('로그인 실패 시 에러 메시지를 표시해야 한다', () => {
    cy.intercept('POST', '/api/v1/customer/login', {
      statusCode: 401,
      body: {
        success: false,
        message: '인증 실패',
      },
    }).as('failedLoginRequest')

    cy.get('input[type="text"]').type('wrongAdmin@test.test')
    cy.get('input[type="password"]').type('wrongPassword')
    cy.get('button[type="submit"]').click()

    cy.contains('로그인에 실패했습니다.').should('be.visible')
  })

  it('입력 필드에 공백만 입력된 경우 로그인 버튼이 비활성화되어야 한다', () => {
    cy.get('input[type="text"]').type('   ')
    cy.get('input[type="password"]').type('   ')

    cy.get('button[type="submit"]').should('be.disabled')
  })
})
