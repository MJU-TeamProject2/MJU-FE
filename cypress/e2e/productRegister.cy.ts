/// <reference types="cypress" />

describe('ProductRegister Component', () => {
  beforeEach(() => {
    // API 응답을 모킹합니다
    cy.intercept('POST', '/api/clothes', {
      statusCode: 200,
      body: { message: 'Product registered successfully' },
    }).as('registerProduct')

    cy.visit('/registerCloth')
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
    cy.get('button[type="submit"]').click()
    cy.on('window:alert', (text) => {
      expect(text).to.equal('빈칸을 모두 채워주세요')
    })
  })

  it('카테고리 선택이 올바르게 동작해야 한다', () => {
    cy.get('select[name="category"]').select('DRESSES')
    cy.get('select[name="category"]').should('have.value', 'DRESSES')
  })

  it('성별 분류 선택이 올바르게 동작해야 한다', () => {
    cy.get('select[name="genderCategory"]').select('MALE')
    cy.get('select[name="genderCategory"]').should('have.value', 'MALE')
  })

  it('숫자 필드에 잘못된 값 입력 시 에러 메시지가 표시되어야 한다', () => {
    // 가격 필드 테스트
    cy.get('input[name="price"]').type('-1000')
    cy.contains('가격은 0보다 커야 합니다').should('be.visible')

    // 할인율 필드 테스트
    cy.get('input[name="discount"]').type('101')
    cy.contains('할인율은 0에서 100 사이여야 합니다').should('be.visible')

    // 재고 필드 테스트
    cy.get('input[name="quantity"]').type('-1')
    cy.contains('수량은 0 이상이어야 합니다').should('be.visible')
  })

  it('이미지 업로드가 올바르게 동작해야 한다', () => {
    // 메인 이미지 업로드 테스트
    cy.get('#mainImage').attachFile({
      filePath: 'test-image.png',
      mimeType: 'image/jpeg',
    })
    cy.get('#mainImagePreview').should('be.visible')

    // 상세 이미지 업로드 테스트
    cy.get('#detailImage').attachFile({
      filePath: 'test-detail-image.png',
      mimeType: 'image/jpeg',
    })
    cy.contains('test-detail-image.jpg').should('be.visible')
  })

  it('3D 파일 업로드 제한이 올바르게 동작해야 한다', () => {
    // 잘못된 확장자 파일 업로드 시도
    cy.get('#objectFile').attachFile({
      filePath: 'test-file.txt',
      mimeType: 'text/plain',
    })
    cy.on('window:alert', (text) => {
      expect(text).to.equal('3D 파일은 obj 파일만 업로드 가능합니다.')
    })

    // 올바른 obj 파일 업로드
    cy.get('#objectFile').attachFile({
      filePath: 'test-model.obj',
      mimeType: 'application/object',
    })
    cy.contains('test-model.obj').should('be.visible')
  })

  it('올바른 데이터로 폼 제출이 성공해야 한다', () => {
    // 필수 필드 입력
    cy.get('input[name="name"]').type('테스트 상품')
    cy.get('select[name="category"]').select('DRESSES')
    cy.get('select[name="genderCategory"]').select('UNISEX')
    cy.get('input[name="price"]').type('50000')
    cy.get('input[name="productNumber"]').type('TEST-001')
    cy.get('input[name="discount"]').type('10')
    cy.get('select[name="size"]').select('M')
    cy.get('input[name="quantity"]').type('100')

    // 이미지 파일들 업로드
    cy.get('#mainImage').attachFile('test-image.jpg')
    cy.get('#detailImage').attachFile('test-detail-image.jpg')
    cy.get('#objectFile').attachFile('test-model.obj')
    cy.get('#mtlFile').attachFile('test-material.mtl')

    // 폼 제출
    cy.get('button[type="submit"]').click()

    // API 호출 확인
    cy.wait('@registerProduct')

    // 성공 알림 확인
    cy.on('window:alert', (text) => {
      expect(text).to.equal('상품이 등록되었습니다')
    })

    // 페이지 이동 확인
    cy.url().should('include', '/adminHome')
  })

  it('API 에러 발생 시 에러 메시지를 표시해야 한다', () => {
    // API 에러 응답 모킹
    cy.intercept('POST', '/api/clothes', {
      statusCode: 500,
      body: { message: 'Server error occurred' },
    }).as('registerProductError')

    // 필수 필드 입력 및 폼 제출
    cy.get('input[name="name"]').type('테스트 상품')
    // ... (다른 필수 필드 입력)
    cy.get('button[type="submit"]').click()

    // 에러 알림 확인
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Server error occurred')
    })
  })
})
