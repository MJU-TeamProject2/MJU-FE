import { useState, useEffect } from 'react'
import { inquiryUser, modifyUserInfo } from '@/api/userApi'
import { UserFormData } from '@/component/common/types'
import { validators } from '@/component/common/validators'
import { BODY_TYPE_AVATARS } from '@/component/common/constants'

export const useUserForm = () => {
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    nickName: '',
    age: 0,
    gender: '',
    email: '',
    phoneNumber: '',
    height: 0,
    weight: 0,
    bodyType: '',
    bodyObjUrl: '',
  })
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const result = await inquiryUser()
    if (!(result instanceof Error)) {
      const avatarInfo = BODY_TYPE_AVATARS.find(
        (avatar) => avatar.type === result.bodyType
      )

      setFormData({
        ...result,
        bodyType: avatarInfo?.name || '',
        bodyObjUrl: result.bodyObjUrl,
      })
    }
  }

  const validateForm = () => {
    if (!validators.phoneNumber(formData.phoneNumber)) {
      throw new Error('전화번호 형식이 올바르지 않습니다.')
    }
    if (!validators.email(formData.email)) {
      throw new Error('이메일 형식이 올바르지 않습니다.')
    }
    return true
  }

  const handleInputChange = (
    field: keyof UserFormData,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    try {
      validateForm()

      const result = await modifyUserInfo(
        formData.name,
        formData.nickName,
        formData.age,
        formData.email,
        formData.phoneNumber,
        formData.height,
        formData.weight,
        formData.bodyObjUrl
      )

      if (result instanceof Error) {
        throw result
      }

      setIsEditing(false)
      alert('회원 정보가 저장되었습니다.')
    } catch (error) {
      alert(
        error instanceof Error ? error.message : '정보 수정에 실패했습니다.'
      )
    }
  }

  return {
    formData,
    isEditing,
    setIsEditing,
    handleInputChange,
    handleSubmit,
  }
}

export default useUserForm
