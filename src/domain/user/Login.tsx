import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Card,
  Title,
  Input,
  Button,
  ErrorMessage,
  LoginContainer,
} from '@/domain/user/styles/login.styled'
import { loginUser } from '@/services/userApi'
import { colors } from '@/constants'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | null>(null)
  const [loginError, setLoginError] = useState<string | null>(null)
  const navigate = useNavigate()

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email.trim() === '') {
      setEmailError(null)
    } else if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.')
    } else {
      setEmailError(null)
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    validateEmail(newEmail)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (emailError) return

    try {
      await loginUser(email, password)
      console.log('로그인 성공')
      navigate('/')
    } catch (error) {
      console.error(error)
      setLoginError('로그인에 실패했습니다.')
    }
  }

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== '' && emailError === null
  }

  return (
    <LoginContainer>
      <Card>
        <Title>로그인</Title>
        <form onSubmit={handleLogin}>
          <div>
            <Input
              type="text"
              placeholder="이메일"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </div>
          <div>
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loginError && <div style={{ color: colors.red }}>{loginError}</div>}
          <Button
            type="submit"
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid()
                ? colors.skyBlue
                : colors.ghostWhite,
            }}
          >
            로그인
          </Button>
        </form>
        <Link to="/register">
          <Button>회원가입</Button>
        </Link>
      </Card>
    </LoginContainer>
  )
}

export default Login
