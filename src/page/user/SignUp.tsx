import React, { useState } from 'react'
import {
  Card,
  Title,
  Input,
  Button,
  GenderContainer,
  GenderLabel,
} from '@/component/user/loginStyles.ts'
import { LoginContainer } from '@/component/user/LoginContainer'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '@/api/userApi'

const SignUp = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    age: 18,
    gender: 'M', // 기본값을 남자로 설정
    email: '',
    password: '',
    phoneNumber: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // 전화번호 형식 검증
    if (name === 'phoneNumber') {
      const phoneRegex = /^\d{3}-\d{4}-\d{4}$/ // xxx-xxxx-xxxx 형식
      if (!phoneRegex.test(value)) {
        setPhoneError('전화번호는 xxx-xxxx-xxxx 형식이어야 합니다.')
      } else {
        setPhoneError(null) // 형식이 맞으면 에러 제거
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // 기본 폼 제출 방지
    if (phoneError) {
      setError('전화번호 형식이 올바르지 않습니다.') // 제출 시 전화번호 형식 오류 처리
      return
    }

    const result = await registerUser(formData) // Promise 반환

    if (result instanceof Error) {
      setError(result.message) // 에러 처리
    } else {
      console.log('회원가입 성공:', result)
      navigate('/') // 회원가입 후 로그인 페이지로 이동
    }
  }

  // 모든 필드가 유효한지 체크
  const isFormValid = () => {
    const { name, age, gender, email, password, phoneNumber } = formData
    return (
      name && age && gender && email && password && phoneNumber && !phoneError // 전화번호 오류가 없을 때만 유효한 것으로 간주
    )
  }

  return (
    <LoginContainer>
      <Card>
        <Title>회원가입</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="age"
            placeholder="나이"
            value={formData.age}
            onChange={handleChange}
            required
            min="0" // 나이 입력 필드에 최소값 설정
          />
          <GenderContainer>
            <GenderLabel>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === 'M'}
                onChange={handleChange}
              />
              남자
            </GenderLabel>
            <GenderLabel>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === 'F'}
                onChange={handleChange}
              />
              여자
            </GenderLabel>
          </GenderContainer>
          <Input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="phoneNumber"
            placeholder="전화번호 (예: 010-1234-5678)"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
          {phoneError && <div style={{ color: 'red' }}>{phoneError}</div>}
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <Button
            type="submit"
            disabled={!isFormValid()}
            style={{ backgroundColor: isFormValid() ? '#007bff' : '#ccc' }}
          >
            회원가입
          </Button>
        </form>
      </Card>
    </LoginContainer>
  )
}

export default SignUp
