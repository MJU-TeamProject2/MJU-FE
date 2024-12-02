describe('어드민 로그인 페이지 테스트', () => {
  beforeEach(() => {
    // 매 테스트 전에 어드민 로그인 페이지 방문
    cy.visit('/adminLogin')
  })

  it('로그인 페이지의 모든 요소가 올바르게 렌더링되어야 한다', () => {
    // 제목 확인
    cy.contains('어드민 로그인').should('be.visible')

    // 입력 필드 확인
    cy.get('input[type="text"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', '어드민 코드')

    cy.get('input[type="password"]')
      .should('be.visible')
      .and('have.attr', 'placeholder', '비밀번호')

    // 로그인 버튼 확인
    cy.get('button[type="submit"]').should('be.visible').and('be.disabled') // 초기에는 비활성화 상태
  })

  it('유효한 입력값이 있을 때만 로그인 버튼이 활성화되어야 한다', () => {
    const adminCode = 'Admin001'
    const password = 'admin1'

    // 초기에는 버튼이 비활성화
    cy.get('button[type="submit"]').should('be.disabled')

    // 어드민 코드만 입력
    cy.get('input[type="text"]').type(adminCode)
    cy.get('button[type="submit"]').should('be.disabled')

    // 비밀번호만 입력
    cy.get('input[type="text"]').clear()
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').should('be.disabled')

    // 모든 필드 입력
    cy.get('input[type="text"]').type(adminCode)
    cy.get('button[type="submit"]').should('be.enabled')
  })

  it('로그인 성공 시 adminHome 페이지로 이동해야 한다', () => {
    // API 응답 모킹
    cy.intercept('POST', '/api/admin/login', {
      statusCode: 200,
      body: {
        success: true,
        token: 'fake-token',
      },
    }).as('loginRequest')

    // 로그인 시도
    cy.get('input[type="text"]').type('Admin001')
    cy.get('input[type="password"]').type('admin1')
    cy.get('button[type="submit"]').click()

    // 페이지 이동 확인
    cy.url().should('include', '/adminHome')
  })

  it('로그인 실패 시 에러 메시지를 표시해야 한다', () => {
    // 실패하는 API 응답 모킹
    cy.intercept('POST', '/api/admin/login', {
      statusCode: 401,
      body: {
        success: false,
        message: '인증 실패',
      },
    }).as('failedLoginRequest')

    // 잘못된 Credentiasls로 로그인 시도
    cy.get('input[type="text"]').type('wrongAdmin')
    cy.get('input[type="password"]').type('wrongPassword')
    cy.get('button[type="submit"]').click()

    // 에러 메시지 확인
    cy.contains('로그인에 실패했습니다.').should('be.visible')
  })

  it('입력 필드에 공백만 입력된 경우 로그인 버튼이 비활성화되어야 한다', () => {
    // 공백만 입력
    cy.get('input[type="text"]').type('   ')
    cy.get('input[type="password"]').type('   ')

    // 버튼 비활성화 확인
    cy.get('button[type="submit"]').should('be.disabled')
  })
})
