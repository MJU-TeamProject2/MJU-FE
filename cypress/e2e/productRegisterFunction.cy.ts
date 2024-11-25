/// <reference types="cypress" />

describe('상품 등록 기능 및 파일 업로드 테스트', () => {
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
        cy.get('input[name="name"]').clear().type('테스트 상품')
        cy.get('select[name="category"]').select('아우터')
        cy.get('select[name="genderCategory"]').select('남녀공용')
        cy.get('input[name="price"]').clear().type('50000')
        cy.get('input[name="productNumber"]').clear().type('TEST-001')
        cy.get('input[name="discount"]').clear().type('10')
        cy.get('select[name="size"]').select('M')
        cy.get('input[name="quantity"]').clear().type('100')

        // 이미지 파일들 업로드
        cy.get('#mainImage').attachFile('test-image.png')
        cy.get('#detailImage').attachFile('test-detail-image.png')
        cy.get('#objectFile').attachFile('test-model.obj')
        cy.get('#mtlFile').attachFile('test-material.mtl')

        // 폼 제출
        cy.get('button[type="submit"]').click()

        // 성공 알림 확인
        cy.on('window:alert', (text) => {
            expect(text).to.equal('상품이 등록되었습니다')
        })

        // 페이지 이동 확인
        cy.url().should('include', '/adminHome')
    })
})
