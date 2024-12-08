describe('상품 수정 테스트', () => {
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

    cy.intercept('PATCH', '/api/v1/clothes/*', {
      statusCode: 200,
      body: {
        success: true,
        data: {},
      },
    }).as('modifyProduct')

    cy.visit('/productsModify/5173')
    cy.wait('@getProduct')
  })

  describe('기본 정보 수정 기능 테스트', () => {
    it('상품에 대한 기본 정보를 수정할 수 있어야 한다.', () => {
      cy.contains('button', '수정').click()

      // Check if basic info form is visible
      cy.get('#modify01').should('be.visible')

      // Modify basic information
      cy.get('input[name="name"]').clear().type('수정된 상품명')
      cy.get('select[name="category"]').select('DRESSES')
      cy.get('input[name="price"]').clear().type('60000')

      // Navigate to next step
      cy.contains('button', '다음').click()

      // Check if size modification form is visible
      cy.get('#modify02').should('be.visible')
    })
  })

  describe('수량 및 재고 수정 기능 테스트', () => {
    it('두 번째 수정 페이지에서 사이즈 및 재고를 수정할 수 있어야 한다.', () => {
      cy.contains('button', '수정').click()
      cy.contains('button', '다음').click()

      cy.get('select[name="size"]').select('M')
      cy.get('input[name="quantity"]').clear().type('25')
    })
  })

  describe('파일 수정 기능 테스트', () => {
    it('세 번째 수정 페이지에서 이미지 파일 및 모델 관련 파일들을 수정할 수 있어야 한다.', () => {
      cy.contains('button', '수정').click()
      cy.contains('button', '다음').click()

      // Test file uploads
      const mainImage = 'test-image.png'
      const detailImage = 'test-detail-image.png'
      const objFile = 'test-model.obj'
      const mtlFile = 'test-material.mtl'

      cy.get('#mainImage').attachFile(mainImage)
      cy.get('#detailImage').attachFile(detailImage)
      cy.get('#objectFile').attachFile(objFile)
      cy.get('#mtlFile').attachFile(mtlFile)
    })
  })

  describe('폼 입력 유효성 검사', () => {
    it('금액 입력에 대한 유효성 검사', () => {
      cy.contains('button', '수정').click()
      cy.get('input[name="price"]').clear().type('-1000')
      cy.contains('button', '다음').click()
      cy.get('#modifyButtonGroup02').find('button:contains("다음")').click()
      cy.get('#modifyButtonGroup03').find('button:contains("수정")').click()
      cy.on('window:alert', (text) => {
        expect(text).to.equal('잘못 입력된 값이 존재합니다.')
      })
    })

    it('할인율 입력에 대한 유효성 검사', () => {
      cy.contains('button', '수정').click()
      cy.get('input[name="discount"]').clear().type('-10')
      cy.contains('button', '다음').click()
      cy.get('#modifyButtonGroup02').find('button:contains("다음")').click()
      cy.get('#modifyButtonGroup03').find('button:contains("수정")').click()
      cy.on('window:alert', (text) => {
        expect(text).to.equal('잘못 입력된 값이 존재합니다.')
      })
    })

    it('수량 입력에 대한 유효성 검사', () => {
      cy.contains('button', '수정').click()
      cy.contains('button', '다음').click()
      cy.get('input[name="quantity"]').clear().type('-5')
      cy.get('#modifyButtonGroup02').find('button:contains("다음")').click()
      cy.get('#modifyButtonGroup03').find('button:contains("수정")').click()
      cy.on('window:alert', (text) => {
        expect(text).to.equal('잘못 입력된 값이 존재합니다.')
      })
    })
  })

  describe('파일 업로드 유효성 검사', () => {
    beforeEach(() => {
      cy.contains('button', '수정').click()
      cy.contains('button', '다음').click()
      cy.get('#modifyButtonGroup02').find('button:contains("다음")').click()
    })

    it('이미지 파일에 대한 유효성 검사', () => {
      const invalidFile = 'test-file.txt'
      cy.get('#mainImage').attachFile(invalidFile)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('이미지 파일만 업로드 가능합니다')
      })
    })

    it('3D 파일 확장자에 대한 유효성 검사', () => {
      const invalidFile = 'test-file.txt'
      cy.get('#objectFile').attachFile(invalidFile)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('3D 파일은 obj 파일만 업로드 가능합니다.')
      })
    })

    it('재질 파일 확장자에 대한 유효성 검사', () => {
      const invalidFile = 'test-file.txt'
      cy.get('#mtlFile').attachFile(invalidFile)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('재질 파일은 mtl 파일만 업로드 가능합니다.')
      })
    })

    it('파일 용량에 대한 유효성 검사', () => {
      const largeFile = 'test-high-memory.jpg'
      cy.get('#mainImage').attachFile(largeFile)
      cy.on('window:alert', (str) => {
        expect(str).to.equal('파일 크기는 10MB를 초과할 수 없습니다.')
      })
    })
  })
})
