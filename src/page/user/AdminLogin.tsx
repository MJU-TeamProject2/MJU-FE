import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Title, Input, Button } from '@/component/styles/user/loginStyles'
import { AdminLoginContainer } from '@/component/styles/user/AdminLoginContainer'
import { loginAdmin } from '@/api/userApi'

const AdminLogin = () => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await loginAdmin(code, password)

    if (result instanceof Error) {
      console.error(result.message)
      setError('로그인에 실패했습니다.')
    } else {
      console.log('어드민 로그인 성공')
      navigate('/adminHome')
    }
  }

  const isFormValid = () => {
    return code.trim() !== '' && password.trim() !== ''
  }

  return (
    <AdminLoginContainer>
      <Card>
        <Title> 어드민 로그인 </Title>
        <form onSubmit={handleAdminLogin}>
          <Input
            type="text"
            placeholder="어드민 코드"
            value={code}
            onChange={(e) => setCode(e.target.value)}
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
      </Card>
    </AdminLoginContainer>
  )
}

export default AdminLogin
