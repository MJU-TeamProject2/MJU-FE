/// <reference types="cypress" />

describe('상품 등록 페이지 렌더링 테스트', () => {
  before(() => {
    cy.visit('/adminLogin')
    cy.get('input[type="text"]').type('Admin001')
    cy.get('input[type="password"]').type('admin1')
    cy.get('button[type="submit"]').click()
  })
  beforeEach(() => {
    cy.visit('/registerCloth')
    // message 속성을 undefined 한 경우를 무시한다.
    cy.on('uncaught:exception', () => {
      return false
    })
  })

  it('모든 필드가 올바르게 표시되어야 한다', () => {
    cy.contains('상품 등록').should('be.visible')
    cy.contains('상품 이름').should('be.visible')
    cy.contains('카테고리').should('be.visible')
    cy.contains('성별 분류').should('be.visible')
    cy.contains('상품 가격').should('be.visible')
    cy.contains('상품 번호').should('be.visible')
    cy.contains('적용 할인율').should('be.visible')
    cy.contains('사이즈').should('be.visible')
    cy.contains('현재 재고').should('be.visible')
  })

  it('폼 제출 시 필수 필드 검증이 동작해야 한다', () => {
    // API 응답 모킹 (필요한 경우)
    cy.intercept('POST', '/api/v1/clothes/product', {
      statusCode: 400,
      body: {
        message: '빈칸을 모두 채워주세요',
      },
    }).as('submitForm')

    cy.window().then((win: Window) => {
      cy.stub(win, 'alert' as keyof Window).as('alertStub')
    })

    // 폼 제출
    cy.get('button[type="submit"]').click()

    // API 응답 대기 (필요한 경우)
    cy.wait('@submitForm')

    // alert 확인
    cy.get('@alertStub').should(
      'have.been.calledWith',
      '빈칸을 모두 채워주세요'
    )
  })

  it('카테고리 선택이 올바르게 동작해야 한다', () => {
    cy.get('select[name="category"]').select('아우터')
    cy.get('select[name="category"]').should('have.value', 'OUTERWEAR')
  })

  it('성별 분류 선택이 올바르게 동작해야 한다', () => {
    cy.get('select[name="genderCategory"]').select('여성용')
    cy.get('select[name="genderCategory"]').should('have.value', 'FEMALE')
  })

  it('숫자 필드에 잘못된 값 입력 시 에러 메시지가 표시되어야 한다', () => {
    // 가격 필드 테스트
    cy.get('input[name="price"]').clear().type('-1000', { delay: 100 })
    cy.get('[class*="sc-eemrSN hWNwAB"]').should('be.visible').and('exist')
    cy.get('input[name="price"]').clear().type('10', { delay: 100 })

    // 할인율 필드 테스트
    cy.get('input[name="discount"]').clear().type('-1000', { delay: 100 })
    cy.get('[class*="sc-eemrSN hWNwAB"]').should('be.visible').and('exist')
    cy.get('input[name="discount"]').clear().type('10', { delay: 100 })

    // 재고 필드 테스트
    cy.get('input[name="quantity"]').clear().type('-1', { delay: 100 })
    cy.get('[class*="sc-eemrSN hWNwAB"]').should('be.visible').and('exist')
  })
})
