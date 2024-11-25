import React from 'react'
import {
  Title,
  Input,
  Button,
  GenderContainer,
  GenderButton,
  HiddenRadio,
  ErrorMessage,
  RegisterContainer,
  FormSection,
} from '@/features/user/styles/registerStyles'
import { useNavigate } from 'react-router-dom'
import { useRegisterForm } from '@/features/user/hooks/useRegisterForm'
import { LoginContainer } from '@/features/user/styles/loginStyles'

const Register = () => {
  const navigate = useNavigate()
  const { formData, errors, handleChange, isFormValid } = useRegisterForm()

  const handleContinue = () => {
    if (!isFormValid()) {
      alert('모든 필수 정보를 올바르게 입력해주세요.')
      return
    }
    sessionStorage.setItem('registerFormData', JSON.stringify(formData))
    navigate('/choose-avatar')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    handleChange(name, value)
  }

  const isValidFormData = (data: unknown): data is FormData => {
    if (!data || typeof data !== 'object') return false

    const requiredKeys = [
      'name',
      'age',
      'gender',
      'email',
      'password',
      'phoneNumber',
      'nickName',
      'height',
      'weight',
      'bodyType',
      'bodyObjUrl',
    ]

    return requiredKeys.every((key) => key in data)
  }

  React.useEffect(() => {
    const savedFormData = sessionStorage.getItem('registerFormData')
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData)

        if (isValidFormData(parsedData)) {
          Object.entries(parsedData).forEach(([key, value]) => {
            handleChange(key, value?.toString() ?? '')
          })
        } else {
          console.error('Invalid form data structure in sessionStorage')
          sessionStorage.removeItem('registerFormData')
        }
      } catch (error) {
        console.error('Error parsing form data from sessionStorage:', error)
        sessionStorage.removeItem('registerFormData')
      }
    }
  }, [])

  return (
    <LoginContainer>
      <RegisterContainer>
        <Title>회원가입</Title>
        <FormSection>
          <form onSubmit={(e) => e.preventDefault()}>
            <Input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name || ''}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="nickName"
              placeholder="닉네임"
              value={formData.nickName || ''}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="age"
              placeholder="나이"
              value={formData.age || ''}
              onChange={handleInputChange}
              required
              min="0"
            />
            <GenderContainer>
              {['M', 'F'].map((gender) => (
                <GenderButton
                  key={gender}
                  type="button"
                  className={formData.gender === gender ? 'selected' : ''}
                  onClick={() => handleChange('gender', gender)}
                >
                  <HiddenRadio
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={() => handleChange('gender', gender)}
                  />
                  {gender === 'M' ? '남자' : '여자'}
                </GenderButton>
              ))}
            </GenderContainer>
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email || ''}
              onChange={handleInputChange}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password || ''}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="phoneNumber"
              placeholder="전화번호 (예: 010-1234-5678)"
              value={formData.phoneNumber || ''}
              onChange={handleInputChange}
              required
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
            <Input
              type="number"
              name="height"
              placeholder="키 (cm)"
              value={formData.height || ''}
              onChange={handleInputChange}
              required
              min="0"
              max="300"
            />
            <Input
              type="number"
              name="weight"
              placeholder="몸무게 (kg)"
              value={formData.weight || ''}
              onChange={handleInputChange}
              required
              min="0"
              max="300"
            />
            <Button type="button" onClick={handleContinue}>
              다음
            </Button>
          </form>
        </FormSection>
      </RegisterContainer>
    </LoginContainer>
  )
}

export default Register
