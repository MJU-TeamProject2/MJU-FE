import React, { useState, useEffect } from 'react'
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
} from '@/component/styles/user/userModifyStyle'
import { inquiryUser, logout, modifyUserInfo } from '@/api/userApi'

const User: React.FC = () => {
  const navigate = useNavigate()
  const [name, setName] = useState(localStorage.getItem('name') || '')
  const [nickname, setNickname] = useState(
    localStorage.getItem('nickname') || ''
  )
  const [age, setAge] = useState(localStorage.getItem('age') || '')
  const [gender, setGender] = useState(localStorage.getItem('gender') || '')
  const [email, setEmail] = useState(localStorage.getItem('email') || '')
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem('phoneNumber') || ''
  )
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('dataLoaded')) {
      getUser()
      localStorage.setItem('dataLoaded', 'true')
    }
    const avatarData = localStorage.getItem('selectedAvatar')
    if (avatarData) {
      const { customAvatar } = JSON.parse(avatarData)
      setSelectedAvatar(customAvatar || null)
    }
  }, [])

  const getUser = async () => {
    const result = await inquiryUser()
    if (!(result instanceof Error)) {
      setName(result.name)
      setAge(result.age)
      setEmail(result.email)
      setGender(result.gender)
      setNickname(result.nickName)
      setPhoneNumber(result.phoneNumber)
      localStorage.setItem('name', result.name)
      localStorage.setItem('nickname', result.nickName)
      localStorage.setItem('age', result.age)
      localStorage.setItem('gender', result.gender)
      localStorage.setItem('email', result.email)
      localStorage.setItem('phoneNumber', result.phoneNumber)
    }
  }

  const modifyUser = async (e: React.FormEvent) => {
    e.preventDefault()
    const phoneRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!phoneRegex.test(phoneNumber) || ! emailRegex.test(email)) {
      alert('전화번호 또는 이메일 형식이 올바르지 않습니다.')
      return;
    }
    const result = await modifyUserInfo(name, nickname, age, email, phoneNumber)
    if (result instanceof Error) {
      console.error(result.message)
      setError('정보 수정에 실패했습니다.')
    } else {
      alert('회원 정보가 저장되었습니다.')
      setIsEditing(false)
      setIsSaved(true)
      localStorage.setItem('name', name)
      localStorage.setItem('nickname', nickname)
      localStorage.setItem('age', age)
      localStorage.setItem('email', email)
      localStorage.setItem('phoneNumber', phoneNumber)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setIsSaved(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <UserModifyContainer>
      <ProfileSection>
        <ProfileImage>
          {selectedAvatar && (
            <img
              src={selectedAvatar}
              alt="Profile"
              style={{ width: '100%', height: '100%', borderRadius: '50%' }}
            />
          )}
        </ProfileImage>
        <ActionButton onClick={handleEdit}>수정하기</ActionButton>
        <ActionButton onClick={() => navigate('/orderHistory')}>
          결제 내역 조회
        </ActionButton>
      </ProfileSection>
      <Card>
        <Title>회원 정보 조회 및 수정</Title>
        <form onSubmit={modifyUser}>
          <InputGroup>
            <Tag>이름</Tag>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              isEditing={isEditing}
              disabled={!isEditing}
            />
          </InputGroup>
          <InputGroup>
            <Tag>성별</Tag>
            <Input type="text" value={gender} disabled isEditing={false} />
            {isEditing && (
              <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                성별은 수정할 수 없습니다.
              </p>
            )}
          </InputGroup>
          <InputGroup>
            <Tag>별명</Tag>
            <Input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
              isEditing={isEditing}
              disabled={!isEditing}
            />
          </InputGroup>
          <InputGroup>
            <Tag>나이</Tag>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              isEditing={isEditing}
              disabled={!isEditing}
            />
          </InputGroup>
          <InputGroup>
            <Tag>전화번호</Tag>
            <Input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              isEditing={isEditing}
              disabled={!isEditing}
            />
          </InputGroup>
          <InputGroup>
            <Tag>이메일</Tag>
            <Input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              isEditing={isEditing}
              disabled={!isEditing}
            />
          </InputGroup>
        </form>
      </Card>
      <FooterButtonGroup>
        <FooterButton onClick={handleClose}>닫기</FooterButton>
        <FooterButton onClick={handleLogout}>로그아웃</FooterButton>
        <SaveButton type="submit" isSaved={isSaved} onClick={modifyUser}>
          저장
        </SaveButton>
      </FooterButtonGroup>
    </UserModifyContainer>
  )
}

export default User
