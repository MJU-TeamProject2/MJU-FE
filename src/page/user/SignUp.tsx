import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const handleSignUp = () => {
    navigate('/home') // 홈으로 이동
  }
  return (
    <Container>
      <LoginCard>
        <Title>회원가입</Title>
        <Input type="text" placeholder="이메일" />
        <Input type="password" placeholder="비밀번호" />
        <Input type="text" placeholder="이름" />
        <Button type="button" onClick={handleSignUp}>
          회원 가입
        </Button>
      </LoginCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 전체 높이 */
  background-color: #f0f0f0; /* 배경 색상 */
`

const LoginCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px; /* 카드 너비 */
  box-sizing: border-box; /* 패딩 포함한 너비 계산 */
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%; /* 부모 요소에 맞춰 100% 너비 */
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* 패딩 포함한 너비 계산 */
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
export default SignUp
