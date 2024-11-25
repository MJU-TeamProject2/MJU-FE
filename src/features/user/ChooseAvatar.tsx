import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AvatarContainer,
  AvatarGrid,
  Avatar,
  Title,
  ButtonGroup,
  Button,
  AvatarItem,
  AvatarName,
} from '@/features/user/styles/chooseAvatarStyles'
import { registerUser } from '@/services/userApi'
import { BODY_TYPE_AVATARS } from '@/constants'

const ChooseAvatar: React.FC = () => {
  const navigate = useNavigate()
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const savedFormData = sessionStorage.getItem('registerFormData')
    if (!savedFormData) {
      // 이전 단계 데이터가 없으면 회원가입 페이지로 리다이렉트
      navigate('/register')
      return
    }

    const { bodyType } = JSON.parse(savedFormData)
    if (bodyType) {
      const avatarIndex = BODY_TYPE_AVATARS.findIndex(
        (avatar) => avatar.type === bodyType
      )
      if (avatarIndex !== -1) {
        setSelectedAvatar(avatarIndex + 1)
      }
    }
  }, [navigate])

  const handleAvatarClick = (id: number) => {
    setSelectedAvatar(selectedAvatar === id ? null : id)
  }

  const handleSubmit = async () => {
    if (!selectedAvatar) {
      alert('체형을 선택해주세요.')
      return
    }

    const savedFormData = sessionStorage.getItem('registerFormData')
    if (!savedFormData) {
      alert('회원가입 정보가 없습니다. 다시 시도해주세요.')
      navigate('/register')
      return
    }

    try {
      setIsSubmitting(true)
      const formData = JSON.parse(savedFormData)
      const selectedBodyType = BODY_TYPE_AVATARS[selectedAvatar - 1]

      // 회원가입 데이터에 체형 정보 추가
      const finalFormData = {
        ...formData,
        bodyType: selectedBodyType.type,
        customAvatar: selectedBodyType.src,
      }

      await registerUser(finalFormData)
      sessionStorage.removeItem('registerFormData')
      alert('회원가입이 완료되었습니다.')
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('회원가입 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBack = () => {
    navigate('/register')
  }

  return (
    <AvatarContainer>
      <Title>
        <span className="bold">체형</span> 선택하기
      </Title>
      <AvatarGrid>
        {BODY_TYPE_AVATARS.map((avatar) => (
          <AvatarItem key={avatar.id}>
            <Avatar
              src={avatar.src}
              alt={avatar.name}
              isSelected={selectedAvatar === avatar.id}
              onClick={() => handleAvatarClick(avatar.id)}
            />
            <AvatarName>{avatar.name}</AvatarName>
          </AvatarItem>
        ))}
      </AvatarGrid>
      <ButtonGroup>
        <Button color="#D9D9D9" onClick={handleBack} disabled={isSubmitting}>
          이전
        </Button>
        <Button
          color="#22B2E4"
          onClick={handleSubmit}
          disabled={isSubmitting || !selectedAvatar}
        >
          회원가입
        </Button>
      </ButtonGroup>
    </AvatarContainer>
  )
}

export default ChooseAvatar
