import { useState } from 'react'

const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email) ? null : '유효한 이메일 주소를 입력해주세요.'
}

const validatePhoneNumber = (phoneNumber: string): string | null => {
  const phoneRegex = /^\d{3}-\d{4}-\d{4}$/
  return phoneRegex.test(phoneNumber)
    ? null
    : '전화번호는 xxx-xxxx-xxxx 형식이어야 합니다.'
}

interface FormData {
  name: string
  age: string
  gender: 'M' | 'F'
  email: string
  password: string
  phoneNumber: string
  nickName: string
}

interface FormErrors {
  email: string | null
  phoneNumber: string | null
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '18',
    gender: 'M',
    email: '',
    password: '',
    phoneNumber: '',
    nickName: '',
  })

  const [errors, setErrors] = useState<FormErrors>({
    email: null,
    phoneNumber: null,
  })

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (name === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (name === 'phoneNumber') {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: validatePhoneNumber(value),
      }))
    }
  }

  const isFormValid = () => {
    const { name, age, gender, email, password, phoneNumber } = formData
    return (
      name &&
      age &&
      gender &&
      email &&
      password &&
      phoneNumber &&
      !errors.email &&
      !errors.phoneNumber
    )
  }

  return { formData, errors, handleChange, isFormValid }
}
