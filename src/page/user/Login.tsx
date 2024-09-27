import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Title,
  Input,
  Button,
  Footer,
  ForgotLink,
  SignupText,
  SignupLink, ErrorMessage,
} from '@/component/user/loginStyles.ts'
import { LoginContainer } from '@/component/user/LoginContainer'
import { loginUser } from '@/api/userApi'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await loginUser(email, password)

    if (result instanceof Error) {
      console.error(result.message)
      setError('로그인에 실패했습니다.')
    } else {
      console.log('로그인 성공')
      navigate('/home')
    }
  }

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== ''
  }

  return (
    <LoginContainer>
      <Card>
        <Title>LOGIN</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="아이디를 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <ForgotLink to="/src/page/user/find-id">
            아이디 찾기/비밀번호 찾기
          </ForgotLink>
          <Button
            type="submit"
            disabled={!isFormValid()}
            style={{ backgroundColor: isFormValid() ? '#22B2E4' : '#ccc' }}
          >
            로그인 하기
          </Button>
        </form>
        <Footer>
          <SignupText>회원이 아니신가요? </SignupText>
          <SignupLink to="/sign-up">회원가입하기</SignupLink>
        </Footer>
      </Card>
    </LoginContainer>
  )
}

export default Login
