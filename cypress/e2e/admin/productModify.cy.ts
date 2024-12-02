describe('상품 조회 테스트', () => {
  before(() => {
    cy.visit('/adminLogin')
    cy.get('input[type="text"]').type('Admin001')
    cy.get('input[type="password"]').type('admin1')
    cy.get('button[type="submit"]').click()
  })
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/clothes/*', {
      statusCode: 200,
      body: {
        success: true,
        data: {
          clothesId: 5173,
          category: 'TOPS',
          imageUrl: 'test-image.jpg',
          name: '테스트 상품',
          price: 50000,
          genderCategory: 'UNISEX',
          productNumber: 'TEST-001',
          discount: 10,
          detailUrl: 'test-detail.jpg',
          clothesSizeList: [
            { size: 'S', quantity: 10 },
            { size: 'M', quantity: 15 },
            { size: 'L', quantity: 20 },
            { size: 'XL', quantity: 25 },
            { size: 'XXL', quantity: 30 },
          ],
          objectUrl: 'test-object.obj',
          objectFemaleUrl: 'test-object-female.obj',
          mtlUrl: 'test-material.mtl',
        },
      },
    }).as('getProduct')

    cy.visit('/productsModify/5173')
    cy.wait('@getProduct')
  })

  describe('상품 정보 가져오기', () => {
    it('정확한 상품 정보를 보여주어야 한다.', () => {
      cy.contains('상품 상세').should('be.visible')
      cy.contains('테스트 상품').should('be.visible')
      cy.contains('TOPS').should('be.visible')
      cy.contains('UNISEX').should('be.visible')
      cy.contains('TEST-001').should('be.visible')
      cy.contains('10').should('be.visible')
      cy.contains('50000').should('be.visible')
    })

    it('사이즈 버튼이 정확히 출력되어야 한다.', () => {
      cy.get('button').contains('S').should('be.visible')
      cy.get('button').contains('M').should('be.visible')
      cy.get('button').contains('L').should('be.visible')
      cy.get('button').contains('XL').should('be.visible')
      cy.get('button').contains('XXL').should('be.visible')
    })
  })

  describe('사이즈 선택', () => {
    it('선택된 사이즈에 맞는 재고 수량을 보여주어야 한다.', () => {
      cy.get('button#S').click()
      cy.contains('10').should('be.visible')

      cy.get('button#M').click()
      cy.contains('15').should('be.visible')

      cy.get('button#L').click()
      cy.contains('20').should('be.visible')
    })

    it('선택된 사이즈 버튼이 강조되어야 한다.', () => {
      cy.get('button#M').click()
      cy.get('button#M')
        .should('have.css', 'background-color', 'rgb(173, 216, 230)') // lightblue
        .should('have.css', 'color', 'rgb(30, 31, 48)') // #1E1F30
    })
  })
})
