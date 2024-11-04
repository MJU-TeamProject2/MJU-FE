import {
  HeaderContainer,
  IconWrapper,
  LeftSection,
  NavLink,
  RightSection,
} from './Header.styles'
import { Home, ArrowLeft, Package, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }
  const handleHomeClick = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      navigate('/AdminHome')
    } else {
      navigate('/AdminLogin')
    }
  }
  return (
    <HeaderContainer>
      <LeftSection>
        <IconWrapper onClick={handleBackClick}>
          <ArrowLeft size={24} />
        </IconWrapper>
        <IconWrapper onClick={handleHomeClick}>
          <Home size={24} />
        </IconWrapper>
      </LeftSection>
      <RightSection>
        <User size={24} />
        <NavLink to="/registerCloth">
          <Package size={24} />
        </NavLink>
      </RightSection>
    </HeaderContainer>
  )
}

export default AdminHeader
