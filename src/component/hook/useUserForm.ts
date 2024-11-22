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
    try {
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
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      alert('사용자 정보를 불러오는데 실패했습니다.')
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

  const convertBodyTypeNameToType = (bodyTypeName: string): string => {
    const avatarInfo = BODY_TYPE_AVATARS.find(
      (avatar) => avatar.name === bodyTypeName
    )
    return avatarInfo?.type || ''
  }

  const handleSubmit = async () => {
    try {
      validateForm()

      // bodyType을 name에서 type으로 변환
      const bodyTypeValue = convertBodyTypeNameToType(formData.bodyType)

      console.log('Converting bodyType:', {
        from: formData.bodyType,
        to: bodyTypeValue,
      })

      const result = await modifyUserInfo(
        formData.name,
        formData.nickName,
        formData.age,
        formData.email,
        formData.phoneNumber,
        formData.height,
        formData.weight,
        bodyTypeValue // 변환된 type 값을 사용
      )

      if (result instanceof Error) {
        throw result
      }

      setIsEditing(false)
      alert('회원 정보가 저장되었습니다.')
    } catch (error) {
      let errorMessage = '정보 수정에 실패했습니다.'

      if (error instanceof Error) {
        errorMessage = error.message || errorMessage
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = (error as { message: string }).message || errorMessage
      }

      alert(errorMessage)
      console.error('Error during form submission:', error)
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
