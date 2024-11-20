import React, { useState } from 'react'
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
} from '@/component/styles/user/chooseAvatarStyles'
import { BODY_TYPE_AVATARS } from '@/component/common/constants'

const ChooseAvatar: React.FC = () => {
  const navigate = useNavigate()
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [customAvatar, setCustomAvatar] = useState<string | null>(null)

  const handleAvatarClick = (id: number) => {
    if (selectedAvatar === id) {
      setSelectedAvatar(null)
    } else {
      setSelectedAvatar(id)
      setCustomAvatar(null)
    }
  }

  const handleSelectClick = () => {
    const avatarToSave =
      customAvatar ||
      (selectedAvatar ? BODY_TYPE_AVATARS[selectedAvatar - 1].src : null)
    localStorage.setItem(
      'selectedAvatar',
      JSON.stringify({ customAvatar: avatarToSave })
    )
    navigate('/') // 홈으로 이동
  }

  const handleCloseClick = () => {
    navigate(-1)
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
        {customAvatar && (
          <AvatarItem>
            <Avatar src={customAvatar} alt="Custom Avatar" isSelected={true} />
            <AvatarName>커스텀</AvatarName>
          </AvatarItem>
        )}
      </AvatarGrid>
      <ButtonGroup>
        <Button color="#D9D9D9" onClick={handleCloseClick}>
          닫기
        </Button>
        <Button color="#22B2E4" onClick={handleSelectClick}>
          선택
        </Button>
      </ButtonGroup>
    </AvatarContainer>
  )
}

export default ChooseAvatar
