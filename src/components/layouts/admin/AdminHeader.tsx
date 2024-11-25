import {
  HeaderContainer,
  IconWrapper,
  LeftSection,
  NavLink,
  RightSection,
} from '@/components/layouts/styles/Header.styles'
import { Home, ArrowLeft, Package, PencilLine } from 'lucide-react'
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
        <NavLink to="/registerCloth">
          <PencilLine size={24} />
        </NavLink>
        <NavLink to="/adminOrderHistory">
          <Package size={24} />
        </NavLink>
      </RightSection>
    </HeaderContainer>
  )
}

export default AdminHeader
