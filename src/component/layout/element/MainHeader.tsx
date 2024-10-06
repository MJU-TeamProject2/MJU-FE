// components/MainHeader.tsx
import React from 'react'
// import { Link } from 'react-router-dom'
import {
  HeaderContainer,
  // HeaderItem,
  LogoLink,
  // LogoLinkText,
} from './Header.styles'
import LogoIcon from '../../../assets/icons/LogoIcon.tsx'

const MainHeader: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoLink to="/">
        <LogoIcon />
      </LogoLink>
    </HeaderContainer>
  )
}

export default MainHeader
