import { Link } from 'react-router-dom'
import { Card, Title, Input, Button } from '@/component/user/LoginStyles'
import { LoginContainer } from '@/component/user/LoginContainer'

const SignUp = () => {
  return (
    <LoginContainer>
      <Card>
        <Title>회원가입</Title>
        <Input type="text" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="text" placeholder="이름" />
        <Link to="/">
          <Button>회원 가입</Button>
        </Link>
      </Card>
    </LoginContainer>
  )
}

export default SignUp
