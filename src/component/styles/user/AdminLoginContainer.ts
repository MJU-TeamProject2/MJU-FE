import styled from 'styled-components'
import { colors } from '@/component/styles/globalStyle'

export const AdminLoginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 0 12px;
  align-items: center;
  background-color: ${colors.adminBackground};
`

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: 12px;
  color: ${colors.primary};
`
