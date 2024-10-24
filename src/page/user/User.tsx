import React, { useState, useEffect, useRef } from 'react'
import { UserModifyContainer } from '@/component/styles/user/UserModifyContainer'
import { inquiryUser, logout, modifyUserInfo } from '@/api/userApi'
import {
  Tag,
  Card,
  Title,
  Input,
  Button,
  InputGroup,
  ButtonGroup,
} from '@/component/styles/user/userModifyStyle'
import { useNavigate } from 'react-router-dom'

const User = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const isMounted = useRef(false)
  useEffect(() => {
    if (!isMounted.current) {
      getUser()
      isMounted.current = true
    }
  }, [])

  const [, setError] = useState<string | null>(null)

  const getUser = async () => {
    const result = await inquiryUser()

    if (result instanceof Error) {
      console.error(result.message)
      setError('정보 조회에 실패했습니다.')
    } else {
      console.log('정보 조회 성공')
      setName(result.name)
      setAge(result.age)
      setEmail(result.email)
      setGender(result.gender)
      setNickname(result.nickName)
      setPhoneNumber(result.phoneNumber)
    }
  }

  const modifyUser = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await modifyUserInfo(name, nickname, age, email, phoneNumber)

    if (result instanceof Error) {
      console.error(result.message)
      setError('정보 수정에 실패했습니다.')
    } else {
      alert('회원 정보가 수정되었습니다.')
    }
  }

  const isFormValid = () => {
    return (
      email.trim() !== '' &&
      name.trim() !== '' &&
      nickname.trim() !== '' &&
      age !== '' &&
      phoneNumber.trim() !== ''
    )
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
      <Card>
        <Title> 회원 정보 조회 및 수정 </Title>
        <form onSubmit={modifyUser}>
          <InputGroup>
            <Tag> 이름 </Tag>
            <Input
              type="text"
              placeholder={name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Tag> 성별 </Tag>
            <Input type="text" placeholder={gender} value={gender} disabled />
          </InputGroup>
          <InputGroup>
            <Tag> 별명 </Tag>
            <Input
              type="text"
              placeholder={nickname}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Tag> 나이 </Tag>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Tag> 전화번호 </Tag>
            <Input
              type="string"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Tag> 이메일 </Tag>
            <Input
              type="text"
              placeholder={email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <ButtonGroup>
            <Button
              type="submit"
              disabled={!isFormValid()}
              style={{ backgroundColor: isFormValid() ? '#007bff' : '#ccc' }}
            >
              수정
            </Button>
            <Button onClick={handleClose}>닫기</Button>
            <Button
              type="button"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </ButtonGroup>
        </form>
      </Card>
    </UserModifyContainer>
  )
}

export default User
