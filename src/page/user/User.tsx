import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserModifyContainer } from "@/component/styles/user/UserModifyContainer.tsx";
import { inquiryUser } from '@/api/userApi'
import {
  Tag,
  Card,
  Title,
  Input,
  Button,
  InputGroup,
  ButtonGroup,
  GenderButtonGroup, GenderButton, ErrorDiv
} from "@/component/styles/user/userModifyStyle.ts";


const User = () => {
  const [ name, setName ] = useState('')
  const [ nickname, setNickname ] = useState('')
  const [ age, setAge ] = useState(0)
  const [ gender, setGender ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repassword, setRePassword ] = useState('');

  // 최초에만 데이터베이스에 정보를 불러오게 설정
  const isMounted = useRef( false );
  useEffect( () => {
    if( !isMounted.current ) {
      getUser();
      isMounted.current = true;
    }
  }, [] );

  const navigate = useNavigate()
  const [ error, setError ] = useState<string | null>( null )

  const getUser = async () => {
    const result = await inquiryUser()

    if( result instanceof Error ){
      console.error( result.message )
      setError( '정보 조회에 실패했습니다.' )
    } else {
      console.log( '정보 조회 성공' )
      console.log( result )
      setName( result.name )
      setAge( result.age )
      setEmail( result.email )
      setNickname( result.nickName );
      setPhoneNumber( result.phoneNumber )
      if( result.gender == 'M' ){
        setGender( 'M' )
      }
      else if ( result.gender == 'F' ){
        setGender( 'F' )
      }
      else {
        console.log( "조회 데이터에 문제가 있습니다.")
      }
    }
  }

  const modifyUser = async (e: React.FormEvent)  => {
    e.preventDefault();
  }

  const isFormValid = () => {
    return (
        email.trim() !== ''
        && password.trim() !== ''
        && name.trim() !== ''
        && nickname.trim() !== ''
        && age !== 0
        && ( gender == 'M' || gender == 'F' )
        && phoneNumber.trim() !== ''
        && password == repassword
    )
  }

  const passwordValidCheck = () => {
    return password == repassword;
  }
  
  const isCurrentGender = () => {
    // 현재 성별에 따른 결과
    return gender=='M';
  }

  const changeGender = ( gender ) => {
    if( gender == 0 ) setGender('M');
    else if ( gender == 1 ) setGender('F');
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
                  onChange={ (e) => setName( e.target.value ) }
                  required
              />
            </InputGroup>
            <InputGroup>
              <Tag> 성별 </Tag>
              <GenderButtonGroup>
                <GenderButton
                    type="button"
                    onClick={ (e) => setGender('M') }
                    style={{ backgroundColor: isCurrentGender() ? '#007bff' : '#1e1e1e' }}
                    disabled={ isCurrentGender() }
                >
                  남
                </GenderButton>
                <GenderButton
                    type="button"
                    onClick={ (e) => setGender('F') }
                    style={{ backgroundColor: isCurrentGender() ? '#1e1e1e' : '#007bff' }}
                    disabled={ !isCurrentGender() }
                >
                  여
                </GenderButton>
              </GenderButtonGroup>
            </InputGroup>
            <InputGroup>
              <Tag> 별명 </Tag>
              <Input
                  type="text"
                  placeholder={nickname}
                  value={nickname}
                  onChange={ (e) => setNickname( e.target.value ) }
                  required
              />
            </InputGroup>
            <InputGroup>
              <Tag> 나이 </Tag>
              <Input
                  type="number"
                  value={age}
                  onChange={ (e) => setAge( e.target.value ) }
                  required
              />
            </InputGroup>
            <InputGroup>
              <Tag> 전화번호 </Tag>
              <Input
                  type="string"
                  value={phoneNumber}
                  onChange={ (e) => setPhoneNumber( e.target.value ) }
                  required
              />
            </InputGroup>
            <InputGroup>
              <Tag> 이메일 </Tag>
              <Input
                  type="text"
                  placeholder={email}
                  value={email}
                  onChange={ (e) => setEmail( e.target.value ) }
                  required
              />
            </InputGroup>
            <InputGroup>
              <Tag> 비밀번호 </Tag>
              <Input
                  type="password"
                  placeholder={password}
                  value={password}
                  onChange={ (e) => setPassword( e.target.value ) }
                  required
              />
            </InputGroup>
            <InputGroup>
              <Tag> 비밀번호 확인 </Tag>
              <Input
                  type="password"
                  placeholder={repassword}
                  value={repassword}
                  onChange={ (e) => setRePassword( e.target.value ) }
                  required
              />
            </InputGroup>
            <ErrorDiv>
              { error && <div style={{ color: 'red' }}> {error}</div> }
            </ErrorDiv>
            <ButtonGroup>
              <Button
                  type="submit"
                  disabled={ !isFormValid() }
                  style={{ backgroundColor: isFormValid() ? '#007bff' : '#ccc' }}
              >
                수정
              </Button>
              <Button>
                닫기
              </Button>
            </ButtonGroup>
          </form>
        </Card>
      </UserModifyContainer>
  )
}

export default User
