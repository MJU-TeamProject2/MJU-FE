import { useState } from 'react'
import { BODY_TYPE_AVATARS } from '@/component/common/constants.ts'
import { validators } from '@/component/common/validators.ts'

const validateEmail = (email: string): string | undefined => {
  return validators.email(email)
    ? undefined
    : '유효한 이메일 주소를 입력해주세요.'
}

const validatePhoneNumber = (phoneNumber: string): string | undefined => {
  return validators.phoneNumber(phoneNumber)
    ? undefined
    : '전화번호는 xxx-xxxx-xxxx 형식이어야 합니다.'
}

const validateHeight = (height: number): string | undefined => {
  return height >= 100 && height <= 250
    ? undefined
    : '키는 100cm에서 250cm 사이여야 합니다.'
}

const validateWeight = (weight: number): string | undefined => {
  return weight >= 30 && weight <= 200
    ? undefined
    : '몸무게는 30kg에서 200kg 사이여야 합니다.'
}

interface FormData {
  name: string
  age: number
  gender: string
  email: string
  password: string
  phoneNumber: string
  nickName: string
  height: number
  weight: number
  bodyType: string
  bodyObjUrl: string
}

interface FormErrors {
  email?: string | null
  phoneNumber?: string | null
  height?: string | null
  weight?: string | null
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 18,
    gender: 'M',
    email: '',
    password: '',
    phoneNumber: '',
    nickName: '',
    height: 170,
    weight: 60,
    bodyType: BODY_TYPE_AVATARS[0].type,
    bodyObjUrl: BODY_TYPE_AVATARS[0].src,
  })

  const [errors, setErrors] = useState<FormErrors>({
    email: undefined,
    phoneNumber: undefined,
    height: undefined,
    weight: undefined,
  })

  const handleChange = (name: string, value: string) => {
    if (name === 'gender') {
      const defaultAvatar = BODY_TYPE_AVATARS.find((_avatar, index) =>
        value === 'M' ? index === 0 : index === 1
      )

      setFormData((prev) => ({
        ...prev,
        [name]: value,
        bodyType: defaultAvatar?.type || '',
        bodyObjUrl: defaultAvatar?.src || '',
      }))
      return
    }

    if (name === 'name') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        nickName: value,
      }))
      return
    }

    if (name === 'height' || name === 'weight') {
      const numValue = Number(value)
      setFormData((prev) => ({ ...prev, [name]: numValue }))

      if (name === 'height') {
        setErrors((prev) => ({ ...prev, height: validateHeight(numValue) }))
      } else {
        setErrors((prev) => ({ ...prev, weight: validateWeight(numValue) }))
      }
      return
    }

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
    const { name, age, gender, email, password, phoneNumber, height, weight } =
      formData

    return (
      name &&
      age &&
      gender &&
      email &&
      password &&
      phoneNumber &&
      height > 0 &&
      weight > 0 &&
      !errors.email &&
      !errors.phoneNumber &&
      !errors.height &&
      !errors.weight
    )
  }

  return { formData, errors, handleChange, isFormValid }
}
