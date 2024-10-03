import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Title, Input, Button } from "@/component/styles/user/loginStyles.ts";
import { UserModifyContainer } from "@/component/styles/user/UserModifyContainer.tsx";
import { inquiryUser } from '@/api/userApi'


const User = () => {
  const { id } = useParams()

  const [ name, setName ] = useState('')
  const [ nickname, setNickname ] = useState('')
  const [ age, setAge ] = useState(0)
  const [ email, setEmail ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ password, setPassword ] = useState('')

  const navigate = useNavigate()
  const [ error, setError ] = useState<string | null>( null )

  const handleUserModify = async ( e: React.FormEvent ) => {
    e.preventDefault()

    const result = await inquiryUser( email, password );

    if( result instanceof Error ) {
      console.error( result.message )
      setError( "정보 조회에 실패했습니다." )
    }
    else {
      console.log( "" )
    }
  }
  // 1. 페이지에 접근할 때 정보를 가지고 와야함
  // 2. 가져온 정보로 페이지에 값을 채워 넣어야 함
  // 3. 수정 버튼을 누르기 전까지는 실제 값이 변경되지 말아야 함
  // 4. 수정 버튼을 누르면 입력된 값으로 실제 값을 변경해야 됨

  const isFormValid = () => {
    return email.trim() !== '' && password.trim() !== ''
  }

  return (
      <UserModifyContainer>
        User {id}
        <Card>
          <Title> 내 정보 </Title>
          <form onSubmit={handleUserModify}>
            <Input
              type="text"
              placeholder={}
              value={}
              onChange={ (e) => setName( e.target.value ) }
              required
            />
            <Input
              type="text"
              placeholder={}
              value={}
              onChange={ (e) => setNickname( e.target.value ) }
              required
            />
            <Input
              type="number"
              placeholder={}
              value={}
              onChange={ (e) => setAge( e.target.value ) }
              required
            />
            <Input
              type="text"
              placeholder={}
              value={}
              onChange={ (e) => setEmail( e.target.value ) }
              required
            />
            <Input
              type="password"
              placeholder={}
              value={}
              onChange={ (e) => setPassword( e.target.value ) }
              required
            />
            <Input
              type="text"
              placeholder={}
              value={}
              onChange={ (e) => setPhoneNumber( e.target.value ) }
              required
            />
            { error && <div style={{ color: 'red' }}> {error}</div> }
            <Button
              type="submit"
              disabled={ !isFormValid() }
              style={{ backgroundColor: isFormValid() ? '#007bff' : '#ccc' }}
            >
              수정
            </Button>
          </form>
        </Card>
      </UserModifyContainer>
  )
}

export default User
