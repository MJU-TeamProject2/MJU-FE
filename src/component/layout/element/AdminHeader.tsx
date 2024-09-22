import React from 'react'
import MujinjangLogo from '@/components/common/MujinjangLogo'
import { HeaderWrapper } from '../../../../../../OneDrive/Desktop/layout/Layout.styles.ts'
import { LogoLink, LogoLinkText } from './Header.styles.ts'

const AdminHeader = () => {
  return (
    <HeaderWrapper>
      <LogoLink to="/">
        <MujinjangLogo />
        <LogoLinkText>ADMIN</LogoLinkText>
      </LogoLink>
    </HeaderWrapper>
  )
}

export default AdminHeader
