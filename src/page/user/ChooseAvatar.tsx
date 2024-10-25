import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AvatarContainer,
  AvatarGrid,
  Avatar,
  Title,
  ButtonGroup,
  Button,
  UploadBox,
} from '@/component/styles/user/chooseAvatarStyles'

import avatar1 from '@/assets/avatars/avatar1.png'
import avatar2 from '@/assets/avatars/avatar2.png'
import avatar3 from '@/assets/avatars/avatar3.png'
import avatar4 from '@/assets/avatars/avatar4.png'
import avatar5 from '@/assets/avatars/avatar5.png'

const mockAvatars = [
  { id: 1, src: avatar1 },
  { id: 2, src: avatar2 },
  { id: 3, src: avatar3 },
  { id: 4, src: avatar4 },
  { id: 5, src: avatar5 },
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setCustomAvatar(reader.result as string)
        setSelectedAvatar(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectClick = () => {
    if (selectedAvatar !== null || customAvatar !== null) {
      navigate('/', { state: { avatarId: selectedAvatar, customAvatar } })
    } else {
      alert('아바타를 선택해주세요.')
    }
  }

  const handleCloseClick = () => {
    navigate(-1)
  }

  return (
    <AvatarContainer>
      <Title>
        <span className="bold">아바타</span> 선택하기
      </Title>
      <AvatarGrid>
        {mockAvatars.map((avatar) => (
          <Avatar
            key={avatar.id}
            src={avatar.src}
            alt={`아바타 ${avatar.id}`}
            isSelected={selectedAvatar === avatar.id}
            onClick={() => handleAvatarClick(avatar.id)}
          />
        ))}
        <UploadBox>
          <label htmlFor="upload-input">파일 입력</label>
          <input
            id="upload-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </UploadBox>
        {customAvatar && (
          <Avatar src={customAvatar} alt="Custom Avatar" isSelected={true} />
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
