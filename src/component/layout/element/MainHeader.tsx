import React from 'react'
import MujinjangLogo from '@/components/common/MujinjangLogo'
import { HeaderWrapper } from '../../../../../../OneDrive/Desktop/layout/Layout.styles.ts'
import { LogoLink } from './Header.styles.ts'

const MainHeader = () => {
  return (
    <HeaderWrapper>
      <LogoLink to="/">
        <MujinjangLogo />
      </LogoLink>
    </HeaderWrapper>
  )
}

export default MainHeader
