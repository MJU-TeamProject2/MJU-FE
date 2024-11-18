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

import RECTANGLE from '@/assets/avatars/RECTANGLE.png'
import SMALL_INVERTED_TRIANGLE from '@/assets/avatars/SMALL_INVERTED_TRIANGLE.png'
import LARGE_TRIANGLE from '@/assets/avatars/LARGE_TRIANGLE.png'

const mockAvatars = [
  { id: 1, src: SMALL_INVERTED_TRIANGLE, name: '역삼각형' },
  { id: 2, src: RECTANGLE, name: '직사각형' },
  { id: 3, src: LARGE_TRIANGLE, name: '사각형' },
]

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
      (selectedAvatar ? mockAvatars[selectedAvatar - 1].src : null)
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
        {mockAvatars.map((avatar) => (
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
