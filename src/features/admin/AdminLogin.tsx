import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Card,
  Title,
  Input,
  Button,
  AdminLoginStyled,
} from '@/features/admin/AdminLogin.styled'
import { loginAdmin } from '@/services/userApi'
import { ErrorMessage } from '@/features/user/styles/login.styled'
import { colors } from '@/constants'

const AdminLogin = () => {
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginAdmin(code, password)
      console.log('어드민 로그인 성공')
      navigate('/adminHome')
    } catch (error) {
      setError('로그인에 실패했습니다.')
    }
  }

  const isFormValid = () => {
    return code.trim() !== '' && password.trim() !== ''
  }

  return (
    <AdminLoginStyled>
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            type="submit"
            disabled={!isFormValid()}
            style={{
              backgroundColor: isFormValid()
                ? colors.lightBlue
                : colors.silverGrey,
            }}
          >
            로그인
          </Button>
        </form>
      </Card>
    </AdminLoginStyled>
  )
}

export default AdminLogin
