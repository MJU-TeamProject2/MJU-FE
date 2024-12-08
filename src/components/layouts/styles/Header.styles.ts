import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { colors } from '@/constants'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: ${colors.charcoalGrey};
  color: ${colors.white};
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`

export const NavLink = styled(Link)`
  color: ${colors.white};
  text-decoration: none;
  margin: 0 10px;
  display: flex;
  align-items: center;
`
export const UserIconWrapper = styled.div`
  cursor: pointer;
`
export const IconWrapper = styled.div`
  cursor: pointer;
  margin: 0 10px;
`
