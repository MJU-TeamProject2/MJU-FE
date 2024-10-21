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

const mockAvatars = [
  { id: 1, src: 'mock-avatar1.png' },
  { id: 2, src: 'mock-avatar2.png' },
  { id: 3, src: 'mock-avatar3.png' },
  { id: 4, src: 'mock-avatar4.png' },
  { id: 5, src: 'mock-avatar5.png' },
]

const ChooseAvatar: React.FC = () => {
  const navigate = useNavigate()
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null)
  const [customAvatar, setCustomAvatar] = useState<string | null>(null)

  const handleAvatarClick = (id: number) => {
    if (selectedAvatar === id) {
      setSelectedAvatar(null) // 이미 선택된 아바타를 다시 클릭하면 해제
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
      navigate('/home', { state: { avatarId: selectedAvatar, customAvatar } })
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
