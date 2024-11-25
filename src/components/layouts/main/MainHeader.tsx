import {
  HeaderContainer,
  IconWrapper,
  LeftSection,
  NavLink,
  RightSection,
  UserIconWrapper,
} from '@/components/layouts/styles/Header.styles'
import { Home, User, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MainHeader = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleUserIconClick = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      navigate('/users')
    } else {
      navigate('/login')
    }
  }

  return (
    <HeaderContainer>
      <LeftSection>
        <IconWrapper onClick={handleBackClick}>
          <ArrowLeft size={24} />
        </IconWrapper>
        <NavLink to="/public">
          <Home size={24} />
        </NavLink>
      </LeftSection>
      <RightSection>
        <UserIconWrapper onClick={handleUserIconClick}>
          <User size={24} />
        </UserIconWrapper>
        <NavLink to="/cart">
          <ShoppingCart size={24} />
        </NavLink>
      </RightSection>
    </HeaderContainer>
  )
}

export default MainHeader
