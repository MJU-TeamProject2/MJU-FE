import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UserModifyContainer,
  ProfileSection,
  ProfileImage,
  ActionButton,
  Card,
  Title,
  InputGroup,
  Tag,
  FooterButtonGroup,
  FooterButton,
  SaveButton,
  Input,
} from '@/features/user/styles/userModify.styled'
import { logout } from '@/services/userApi'
import useUserForm from '@/features/user/hooks/useUserForm'
import { BODY_TYPE_AVATARS, FORM_FIELDS } from '@/constants'

const User: React.FC = () => {
  const navigate = useNavigate()
  const { formData, isEditing, setIsEditing, handleInputChange, handleSubmit } =
    useUserForm()

  const getAvatarSrc = (bodyType: string) => {
    const avatar = BODY_TYPE_AVATARS.find((avatar) => avatar.name === bodyType)
    return avatar ? avatar.src : ''
  }

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      await handleSubmit()
    } else {
      setIsEditing(true)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <UserModifyContainer>
      <ProfileSection>
        <ProfileImage>
          <img
            src={getAvatarSrc(formData.bodyType)}
            alt="Avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </ProfileImage>
        <ActionButton onClick={() => navigate('/orderHistory')}>
          결제 내역 조회
        </ActionButton>
      </ProfileSection>
      <Card>
        <Title>회원 정보 조회 및 수정</Title>
        <form onSubmit={isEditing ? handleEditSave : (e) => e.preventDefault()}>
          {FORM_FIELDS.map((field) => (
            <InputGroup key={field.id}>
              <Tag>{field.label}</Tag>
              <Input
                type={field.type}
                value={formData[field.id as keyof typeof formData]}
                onChange={(e) =>
                  handleInputChange(
                    field.id as keyof typeof formData,
                    field.type === 'number'
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
                required
                $isEditing={isEditing && field.editable}
                disabled={!isEditing || !field.editable}
              />
            </InputGroup>
          ))}
        </form>
      </Card>
      <FooterButtonGroup>
        <FooterButton onClick={() => navigate(-1)}>닫기</FooterButton>
        <FooterButton onClick={handleLogout}>로그아웃</FooterButton>
        <SaveButton type="submit" onClick={handleEditSave}>
          {isEditing ? '저장' : '수정'}
        </SaveButton>
      </FooterButtonGroup>
    </UserModifyContainer>
  )
}

export default User
