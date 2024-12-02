describe('회원가입 페이지 테스트', () => {
  beforeEach(() => {
    cy.visit('/register')
    cy.window().then((win: Window) => {
      win.sessionStorage.clear()
    })
  })

  // afterEach(() => {
  //   cy.window().then((win: Window) => {
  //     win.sessionStorage.clear()
  //   })
  // })

  it('회원가입 페이지의 모든 필수 입력 필드가 표시되어야 한다', () => {
    cy.contains('회원가입').should('be.visible')

    cy.get('input[name="name"]').should('be.visible')
    cy.get('input[name="nickName"]').should('be.visible')
    cy.get('input[name="age"]').should('be.visible')
    cy.get('input[name="email"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.get('input[name="phoneNumber"]').should('be.visible')
    cy.get('input[name="height"]').should('be.visible')
    cy.get('input[name="weight"]').should('be.visible')

    cy.contains('남자').should('be.visible')
    cy.contains('여자').should('be.visible')
  })

  it('유효한 데이터를 모두 입력했을 때 다음 단계로 진행되어야 한다', () => {
    cy.get('input[name="name"]').type('홍길동')
    cy.get('input[name="age"]').type('25')
    cy.contains('남자').click()
    cy.get('input[name="email"]').type('testCypress123@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="phoneNumber"]').type('010-1234-5678')

    cy.contains('다음').click()
    cy.url().should('include', '/choose-avatar')
  })

  it('이메일 형식이 잘못된 경우 에러 메시지가 표시되어야 한다', () => {
    cy.get('input[name="email"]').type('invalid-email')
    cy.get('input[name="email"]').blur()
    cy.contains('유효한 이메일 주소를 입력해주세요.').should('be.visible')
  })

  it('전화번호 형식이 잘못된 경우 에러 메시지가 표시되어야 한다', () => {
    cy.get('input[name="phoneNumber"]').type('01012345678')
    cy.get('input[name="phoneNumber"]').blur()
    cy.contains('전화번호는 xxx-xxxx-xxxx 형식이어야 합니다.').should(
      'be.visible'
    )
  })

  it('필수 필드가 비어있는 경우 다음 단계로 진행되지 않아야 한다', () => {
    cy.contains('다음').click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('모든 필수 정보를 올바르게 입력해주세요')
    })
    cy.url().should('include', '/register')
  })

  it('이름 입력 시 닉네임이 자동으로 설정되어야 한다', () => {
    const testName = '홍길동'
    cy.get('input[name="name"]').type(testName)
    cy.get('input[name="nickName"]').should('have.value', testName)
  })

  it('이전에 입력한 데이터가 sessionStorage에서 복원되어야 한다', () => {
    const testData = {
      name: '홍길동',
      age: 25,
      gender: 'M',
      email: 'test@example.com',
      password: 'password123',
      phoneNumber: '010-1234-5678',
      nickName: '홍길동',
      height: 175,
      weight: 70,
      bodyType: 'type1',
      bodyObjUrl: 'url1',
    }

    cy.window().then((win: Window) => {
      win.sessionStorage.setItem('registerFormData', JSON.stringify(testData))
    })
    cy.reload()

    cy.get('input[name="name"]').should('have.value', testData.name)
    cy.get('input[name="nickName"]').should('have.value', testData.nickName)
    cy.get('input[name="age"]').should('have.value', testData.age.toString())
    cy.get('input[name="email"]').should('have.value', testData.email)
    cy.get('input[name="password"]').should('have.value', testData.password)
    cy.get('input[name="phoneNumber"]').should(
      'have.value',
      testData.phoneNumber
    )
    cy.get('input[name="height"]').should(
      'have.value',
      testData.height.toString()
    )
    cy.get('input[name="weight"]').should(
      'have.value',
      testData.weight.toString()
    )

    cy.get('input[name="gender"][value="M"]').should('be.checked')
  })
})
