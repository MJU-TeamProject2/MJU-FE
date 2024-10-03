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
      setError( "" )
    }
    else {
      console.log( "" )
      navigate( "/" )
    }
  }

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
