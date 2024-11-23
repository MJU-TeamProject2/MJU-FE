/// <reference types="cypress" />

describe('AdminHome Component', () => {
  beforeEach(() => {
    // API 응답을 모킹합니다
    cy.intercept('GET', '/api/clothes*', {
      statusCode: 200,
      body: {
        content: [
          {
            id: 1,
            name: '테스트 의류 1',
            price: 29000,
            imageUrl: 'test-image-1.jpg',
          },
          {
            id: 2,
            name: '테스트 의류 2',
            price: 39000,
            imageUrl: 'test-image-2.jpg',
          },
        ],
        total: 15,
      },
    }).as('getClothes')

    // 컴포넌트 페이지로 이동
    cy.visit('/admin')
  })

  it('페이지가 올바르게 로드되어야 한다', () => {
    cy.wait('@getClothes')
    cy.contains('등록된 의상 목록').should('be.visible')
    cy.contains('상품 정보를 수정하려면 해당 상품을 클릭해주세요').should(
      'be.visible'
    )
  })

  it('의류 아이템이 올바르게 표시되어야 한다', () => {
    cy.wait('@getClothes')
    cy.get('[data-testid="grid-container"]').within(() => {
      cy.contains('테스트 의류 1').should('be.visible')
      cy.contains('29,000원').should('be.visible')
      cy.get('img[alt="테스트 의류 1"]').should('be.visible')
    })
  })

  it('페이지네이션이 올바르게 작동해야 한다', () => {
    cy.wait('@getClothes')

    // 초기 페이지 확인
    cy.contains('1 / 2').should('be.visible')

    // 이전 버튼이 첫 페이지에서 비활성화되어 있는지 확인
    cy.contains('이전').should('be.disabled')

    // 다음 페이지로 이동
    cy.contains('다음').click()
    cy.wait('@getClothes')
    cy.contains('2 / 2').should('be.visible')

    // 마지막 페이지에서 다음 버튼이 비활성화되어 있는지 확인
    cy.contains('다음').should('be.disabled')
  })

  it('의류 아이템 클릭 시 수정 페이지로 이동해야 한다', () => {
    cy.wait('@getClothes')
    cy.contains('테스트 의류 1').click()
    cy.url().should('include', '/productsModify/1')
  })

  it('상품 등록 버튼 클릭 시 등록 페이지로 이동해야 한다', () => {
    cy.wait('@getClothes')
    cy.contains('상품 등록').click()
    cy.url().should('include', '/registerCloth')
  })

  it('API 에러 발생 시 에러 메시지를 표시해야 한다', () => {
    // API 에러 응답을 모킹
    cy.intercept('GET', '/api/clothes*', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('getClothesError')

    cy.visit('/admin')
    cy.wait('@getClothesError')
    cy.contains('Failed to fetch products. Please try again.').should(
      'be.visible'
    )
  })

  it('로딩 상태를 올바르게 처리해야 한다', () => {
    // 지연된 API 응답을 모킹
    cy.intercept(
      {
        method: 'GET',
        pathname: '/api/clothes*',
      },
      (req) => {
        req.reply({
          delay: 1000,
          statusCode: 200,
          body: {
            content: [],
            total: 0,
          },
        })
      }
    ).as('getClothesDelayed')

    cy.visit('/admin')
    // 로딩 상태 확인 (로딩 인디케이터가 있다고 가정)
    cy.get('[data-testid="loading-indicator"]').should('be.visible')
    cy.wait('@getClothesDelayed')
    cy.get('[data-testid="loading-indicator"]').should('not.exist')
  })
})
