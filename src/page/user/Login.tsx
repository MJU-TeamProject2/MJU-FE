import { Link } from 'react-router-dom'
import { Card, Title, Input, Button } from '@/component/user/LoginStyles'
import { LoginContainer } from '@/component/user/LoginContainer'

const Login = () => {
  return (
    <LoginContainer>
      <Card>
        <Title>로그인</Title>
        <Input type="text" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Link to="/home">
          <Button>로그인</Button>
        </Link>
        <Link to="/sign-up">
          <Button>회원가입</Button>
        </Link>
      </Card>
    </LoginContainer>
  )
}

export default Login
