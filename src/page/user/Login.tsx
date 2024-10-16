import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Title, Input, Button } from '@/component/styles/user/loginStyles'
import { LoginContainer } from '@/component/styles/user/LoginContainer'
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
        <Title>로그인</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Button
            type="submit"
            disabled={!isFormValid()}
            style={{ backgroundColor: isFormValid() ? '#007bff' : '#ccc' }}
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
