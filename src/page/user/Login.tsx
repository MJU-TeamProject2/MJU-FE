import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/home') // 홈으로 이동
  }

  const handleSignUp = () => {
    navigate('/sign-up') // 회원가입으로 이동
  }

  return (
    <Container>
      <LoginCard>
        <Title>로그인</Title>
        <Input type="text" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Button type="button" onClick={handleLogin}>
          로그인
        </Button>
        <LinkButton type="button" onClick={handleSignUp}>
          회원가입
        </LinkButton>
      </LoginCard>
    </Container>
  )
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`

const LoginCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  box-sizing: border-box;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px; /* 버튼 간의 간격 */

  &:hover {
    background-color: #0056b3;
  }
`

const LinkButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
export default Login
