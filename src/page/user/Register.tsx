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
  Select,
} from '@/component/styles/user/registerStyles'
import { LoginContainer } from '@/component/styles/user/LoginContainer'

import { useNavigate } from 'react-router-dom'
import { registerUser } from '@/api/userApi'
import { useRegisterForm } from '@/component/hook/useRegisterForm'

const Register = () => {
  const navigate = useNavigate()
  const { formData, errors, handleChange, isFormValid } = useRegisterForm()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return
    try {
      await registerUser(formData)
      console.log('회원가입 성공')
      navigate('/login')
    } catch (e) {
      console.error(e)
      alert(e)
    }
  }

  return (
    <LoginContainer>
      <RegisterContainer>
        <Title>회원가입</Title>
        <FormSection>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              placeholder="이름"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
            <Input
              type="text"
              name="nickName"
              placeholder="닉네임"
              value={formData.nickName}
              onChange={(e) => handleChange('nickName', e.target.value)}
              required
            />
            <Input
              type="number"
              name="age"
              placeholder="나이"
              value={formData.age}
              onChange={(e) => handleChange('age', e.target.value)}
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
                    name="gender"
                    value={gender}
                    checked={formData.gender === gender}
                    onChange={() => {}}
                  />
                  {gender === 'M' ? '남자' : '여자'}
                </GenderButton>
              ))}
            </GenderContainer>
            <Input
              type="email"
              name="email"
              placeholder="이메일"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
            />
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
            <Input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              required
            />
            <Input
              type="text"
              name="phoneNumber"
              placeholder="전화번호 (예: 010-1234-5678)"
              value={formData.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              required
            />
            {errors.phoneNumber && (
              <ErrorMessage>{errors.phoneNumber}</ErrorMessage>
            )}
            <Input
              type="number"
              name="height"
              placeholder="키 (cm)"
              value={formData.height}
              onChange={(e) => handleChange('height', e.target.value)}
              required
              min="0"
              max="300"
            />
            <Input
              type="number"
              name="weight"
              placeholder="몸무게 (kg)"
              value={formData.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              required
              min="0"
              max="300"
            />
            <Select
              name="bodyType"
              value={formData.bodyType}
              onChange={(e) => handleChange('bodyType', e.target.value)}
              required
            >
              <option value="">체형 선택</option>
              <option value="RECTANGLE">RECTANGLE</option>
              <option value="TRIANGLE">TRIANGLE</option>
              <option value="INVERTED_TRIANGLE">INVERTED_TRIANGLE</option>
              <option value="OVAL">OVAL</option>
              <option value="HOURGLASS">HOURGLASS</option>
            </Select>
            <Button type="submit" disabled={!isFormValid()}>
              회원가입
            </Button>
          </form>
        </FormSection>
      </RegisterContainer>
    </LoginContainer>
  )
}

export default Register
